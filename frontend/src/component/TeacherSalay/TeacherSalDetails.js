import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from "sweetalert";
//import "../Component/Stdp.css";



class TeacherSalDetails extends Component {

    constructor(props) {

        super(props);

        this.state = {
            posts: []
        };

    }

    //call the link
    componentDidMount() {
        this.retrievePosts();
    }


    retrievePosts() {
        axios.get("http://localhost:5000/teacsal").then(res => {
            console.log("hello3");
            if (res.data.success) {
                this.setState({
                    posts: res.data.existingPosts

                });

                console.log(this.state.posts);
            }
        });
    }


    //delete function 
    onDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:5000/teacsal/delete/${id}`).then((res) => {
                        swal("Deleted Successful", "Teacher Salary Details are removed", "success");


                        this.retrievePosts();
                    })
                } else {
                    swal("Your Data safe!");
                }
            });
    }





    //search function start here

    filterData(posts, searchKey) {

        const result = posts.filter((post) =>
            post.teachName.toLowerCase().includes(searchKey) ||
            post.teachId.toLowerCase().includes(searchKey) ||
            post.workingday.toLowerCase().includes(searchKey) ||
            post.leaveDay.toLowerCase().includes(searchKey) ||
            post.deparment.toLowerCase().includes(searchKey)



        )

        this.setState({ posts: result })
    }


    handleSearchArea = (e) => {

        const searchKey = e.currentTarget.value;

        axios.get("http://localhost:5000/teacsal").then(res => {

            if (res.data.success) {

                this.filterData(res.data.existingPosts, searchKey)
            }
        });
    }

    render() {
        return (
            <div className="container" >

                <div className='text-center'>
                    <h1 style={{
                        color: "#000080"
                    }}> Teacher Salary Details </h1></div>

                <button class="btn"><i class="fa fa-home" style={{ width: '80%' }}></i></button>

                <div className="col-lg-3 mt-2 mb-2">
                    <br></br>
                    <br></br>
                    <input
                        className="form-control"
                        style={{
                            fontSize: 'medium',
                            marginLeft: '60%'
                        }}
                        type="search"
                        placeholder="search"
                        name="searchQuery"
                        onChange={this.handleSearchArea}>

                    </input>

                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Teacher Name</th>
                            <th scope="col">Teacher ID</th>
                            <th scope="col">Working Days</th>
                            <th scope="col">Leave Days</th>
                            <th scope="col">EPF</th>
                            <th scope="col">Basic Salary</th>
                            <th scope="col">Department</th>
                            <th scope="col">Action </th>



                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.posts.map((posts, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>


                                        {posts.teachName}


                                    </td>

                                    <td>{posts.teachId}</td>
                                    <td>{posts.workingday}</td>
                                    <td>{posts.leaveDay}</td>
                                    <td>{posts.epf}</td>
                                    <td>{posts.basicsal}</td>
                                    <td>{posts.deparment}</td>



                                    <td>


                                        <a className="btn btn-warning" style={{ fontSize: 'medium' }} href={`/teachUpdate/${posts._id}`} >
                                            <i class="fas fa-edit" style={{ fontSize: 'large' }}></i> &nbsp;
                                            Edit
                                        </a>
                                        &nbsp;

                                        <button className="btn btn-danger" style={{ fontSize: 'medium' }} onClick={() => { this.onDelete(posts._id) }}>
                                            <i className="fas fa-trash-alt" style={{ fontSize: 'large' }} ></i>&nbsp;Delete

                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                    <br />




                </table >
                <button className="btn btn-primary"><a href="/teachReport" style={{ fontSize: 'medium', textDecoration: 'none', color: 'white', }}>Teacher Salary Report</a> </button>

            </div >

        )
    }
}

export default TeacherSalDetails;