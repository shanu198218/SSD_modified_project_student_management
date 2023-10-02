import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from 'sweetalert';

export default class classHome extends Component {
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
    axios.get('/postsClass').then(res => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts
        });
        console.log(this.state.posts);

      }
    });
  }

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
          axios.delete(`/postClass/delete/${id}`).then((res) => {
            swal("Deleted Successfully", "Class Details Are Removed", "success");


            this.retrievePosts();
          })
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }

  filterData(posts, searchKey) {
    const result = posts.filter((post) =>

      post.subjectName.toLowerCase().includes(searchKey) ||
      post.subjectCode.toLowerCase().includes(searchKey) ||
      post.teacherName.toLowerCase().includes(searchKey) ||
      post.classType.toLowerCase().includes(searchKey) ||
      post.hallNo.toLowerCase().includes(searchKey) ||
      post.startDate.toLowerCase().includes(searchKey) ||
      post.time.toLowerCase().includes(searchKey)

    )
    this.setState({ posts: result })
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get('/postsClass').then(res => {
      if (res.data.success) {

        this.filterData(res.data.existingPosts, searchKey)
      }
    });
  }

  render() {
    return (
      <div ><br></br>

        <div className="text-center">
          <h1 className="adminletter" style={{ color: 'navy' }}><b>All Class Details </b></h1>

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
              <th scope="col"><b>Class ID</b></th>
              <th scope="col"><b>Subject Name</b></th>
              <th scope="col"><b>Subject Code</b></th>
              <th scope="col"><b>Grade</b></th>
              <th scope="col"><b>Teacher's Name</b></th>
              <th scope="col"><b>Class Type</b></th>
              <th scope="col"><b>Hall No.</b></th>
              <th scope="col"><b>Start Date</b></th>
              <th scope="col"><b>Time</b></th>
              <th scope="col"><b>Action</b></th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>{posts.subjectName}</td>
                <td>{posts.subjectCode}</td>
                <td>{posts.grade}</td>
                <td>{posts.teacherName}</td>
                <td>{posts.classType}</td>
                <td>{posts.hallNo}</td>
                <td>{posts.startDate}</td>
                <td>{posts.time}</td>

                <td>

                  <a className="btn btn-warning" href={`/editClass/${posts._id}`}>
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
        <a className="btn btn-success" style={{ marginTop: '15px', backgroundColor: '#035740'  }} href={`/addClass`}> 
          <i className="fas fa-pencil-alt"></i>&nbsp;ADD NEW CLASS
        </a>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <a className="btn btn-primary" style={{ marginTop: '15px', backgroundColor: '#000080' }} href={`/classReport`}> 
        <i className="fas fa-download"></i>&nbsp;Go To Report
        </a>

      </div>
    )
  }
}
