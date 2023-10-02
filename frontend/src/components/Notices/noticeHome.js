import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from 'sweetalert';

export default class classNotice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get('/postsNotice').then(res => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts
        });
        console.log(this.state.posts);

      }
    });
  }

  //Delete operation of notices

  onDelete = (id) => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {

        if (willDelete) {
          axios.delete(`/postNotice/deletenotice/${id}`).then((res) => {
            swal("Deleted Successfully", "Notice Details Are Removed", "success");


            this.retrievePosts();
          })
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }

  //Search Operation of notices

  filterData(posts, searchKey) {
    const result = posts.filter((post) =>

      post.noticeType.toLowerCase().includes(searchKey) ||
      post.noticeDate.toLowerCase().includes(searchKey) ||
      post.noticeTitle.toLowerCase().includes(searchKey) ||
      post.noticeBody.toLowerCase().includes(searchKey)

    )
    this.setState({ posts: result })
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get('/postsNotice').then(res => {
      if (res.data.success) {

        this.filterData(res.data.existingPosts, searchKey)
      }
    });
  }

  render() {
    return (
      <div ><br></br>

        <div className="text-center">
          <h1 className="adminletter" style={{ color: 'navy' }}><b>All Notice Details </b></h1>

        </div>
        <div className="col-md-6 mb-4">
          <form class="form-inline">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}>
            </input>
          </form><br></br>
        </div>
        <table className="table table-striped" style={{ color: '#362419' }}>
          <thead> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <tr>
              <th scope="col"><b>Notice Type</b></th>
              <th scope="col"><b>Notice Date</b></th>
              <th scope="col"><b>Notice Title</b></th>
              <th scope="col"><b>Notice Body</b></th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>{posts.noticeType}</td>
                <td>{posts.noticeDate}</td>
                <td>{posts.noticeTitle}</td>
                <td>{posts.noticeBody}</td>

                <td>

                  <a className="btn btn-warning" href={`/editnotice/${posts._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;EDIT
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() => this.onDelete(posts._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;DELETE
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a className="btn btn-success" style={{ marginTop: '15px', backgroundColor: '#035740' }} href={`/addnotice`}>
          <i className="fas fa-pencil-alt"></i>&nbsp;ADD NEW NOTICE
        </a>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <a className="btn btn-primary" style={{ marginTop: '15px', backgroundColor: '#000080' }} href={`/noticeReport`}>
          <i className="fas fa-download"></i>&nbsp;Go To Report
        </a>

      </div>
    )
  }
}
