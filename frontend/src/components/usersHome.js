import React, { Component } from "react";
import axios from "../action/axios";
import swal from "sweetalert";
import "./Allusers.css";

export default class usersHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/api/v1/postsUser").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
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
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/api/v1//postUser/delete/${id}`).then((res) => {
          swal("Deleted Successful", "User Details are removed", "success");

          this.retrievePosts();
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  filterData(posts, searchKey) {
    const result = posts.filter(
      (post) =>
        post.name.toLowerCase().includes(searchKey) ||
        post.email.toLowerCase().includes(searchKey) ||
        post.role.toLowerCase().includes(searchKey) ||
        post.idNumber.toLowerCase().includes(searchKey)
    );
    this.setState({ posts: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/api/v1/postsUser").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  render() {
    return (
      
      <div className="container">
        

        
        <div className="col-md-6 mb-4">
          <form class="form-inline">
          <h2 className="adminletter"> All User Details </h2>
            <i class="fas fa-search" aria-hidden="true"></i>
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </form>
        </div>
       

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">idNumber</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>{posts.name}</td>
                <td>{posts.email}</td>
                <td>{posts.role}</td>
                <td>{posts.idNumber}</td>
                <td>{posts.password}</td>

                <td>
                  <a className="btn btn-warning" href={`edit/${posts._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;EDIT
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(posts._id)}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp;DELETE
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary"><a href="/userreport" style={{ fontSize:'medium', textDecoration: 'none', color: 'white' }}>User Report</a> </button>

      </div>
    );
  }
}
