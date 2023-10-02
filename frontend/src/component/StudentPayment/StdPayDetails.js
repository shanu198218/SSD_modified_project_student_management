import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from "sweetalert";




class StdPayDetails extends Component {

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
        axios.get("http://localhost:5000/stdpay").then(res => {
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
                    axios.delete(`http://localhost:5000/stdpay/delete/${id}`).then((res) => {
                        swal("Deleted Successful", "Student Payment Registration Details are removed", "success");


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
            post.studentId.toLowerCase().includes(searchKey) ||
            post.email.toLowerCase().includes(searchKey) ||
            post.mobiNum.toLowerCase().includes(searchKey) ||
            post.gradeLevel.toLowerCase().includes(searchKey) ||
            post.sfirstName.toLowerCase().includes(searchKey) ||
            post.slastName.toLowerCase().includes(searchKey)


        )

        this.setState({ posts: result })
    }


    handleSearchArea = (e) => {

        const searchKey = e.currentTarget.value;

        axios.get("http://localhost:5000/stdpay").then(res => {

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
                    }}>Student Payment Registration Details </h1></div>

                <button class="btn"><i class="fa fa-home" style={{ width: '80%' }}></i></button>

                <div className="col-lg-3 mt-2 mb-2" style={{
                    fontSize: 'large',
                }}>
                    <br></br>
                    <br></br>
                    <input
                        className="form-control" style={{
                            fontSize: 'medium',
                            marginLeft: '40%'
                        }}
                        type="search"
                        fontSize='medium'
                        placeholder="search"
                        name="searchQuery"
                        onChange={this.handleSearchArea} >


                    </input>

                </div>
                <br />
                <br />
                <br />
                <br />

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Student First Name</th>
                            <th scope="col">Student Last Name</th>
                            <th scope="col">Student ID</th>
                            <th scope="col">Grade Level</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Action </th>



                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.posts.map((posts, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>


                                        {posts.sfirstName}


                                    </td>

                                    <td>{posts.slastName}</td>
                                    <td>{posts.studentId}</td>
                                    <td>{posts.gradeLevel}</td>
                                    <td>{posts.mobiNum}</td>
                                    <td>{posts.email}</td>
                                    <td>{posts.payMethod}</td>



                                    <td>


                                        <a className="btn btn-warning" style={{ fontSize: 'medium' }} href={`/StdUpdate/${posts._id}`} >
                                            <i class="fas fa-edit" style={{ fontSize: 'medium' }} ></i>
                                            Edit
                                        </a>
                                        &nbsp;


                                        <button className="btn btn-danger" style={{ fontSize: 'medium' }} onClick={() => { this.onDelete(posts._id) }}>
                                            <i className="fas fa-trash-alt" style={{ fontSize: 'medium' }}></i>Delete

                                        </button>




                                        <button className="btn btn-link"><a href="/mail" style={{ fontSize: 'medium' }} >
                                            <i className="fas fa-trash-alt" style={{ fontSize: 'medium' }}></i>Request</a>

                                        </button>
                                        &nbsp;






                                    </td>
                                </tr>
                            ))}
                    </tbody>
                    <br />




                </table >
                <button className="btn btn-primary"><a href="/Sreport" style={{ textDecoration: 'none', color: 'white', fontSize: 'medium' }}>Student Payment Report</a> </button>

            </div >

        )
    }
}

export default StdPayDetails;