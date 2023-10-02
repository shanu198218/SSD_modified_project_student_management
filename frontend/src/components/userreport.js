import React, { Component } from "react";
import axios from "../action/axios";
import swal from "sweetalert";
import "./Allusers.css";
import jsPdf from 'jspdf';
import 'jspdf-autotable';

export default class UserReport extends Component {
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

  jsPdfGenerator = () => {

    swal("Done!", "Your Report is Downloding!", "success")
    //new document in jspdf
    var doc = new jsPdf('l', 'pt', 'a3');
    doc.text(600, 20, 'All Users Details Report', { align: 'center' },);
    doc.autoTable({ html: '#user-table' })
    doc.autoTable({

        columnStyles: { europe: { halign: 'center' } },

        margin: { top: 10 },

    })

    //save the pdf

    doc.save("Student User Details.pdf");

}

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
       

        <table className="table table-striped" id="user-table">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">idNumber</th>
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

                
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-outline-primary" style={{

fontSize: 'medium',

}} onClick={this.jsPdfGenerator}><b>Generate Report PDF</b></button>
      </div>
    );
  }
}
