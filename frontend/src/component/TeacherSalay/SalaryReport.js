import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from "sweetalert";
import jsPdf from 'jspdf';
import 'jspdf-autotable';

class SalaryReport extends Component {

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








    //search function start here
    filterData(posts, searchKey) {

        const result = posts.filter((post) =>
            post.teachName.toLowerCase().includes(searchKey) ||
            post.teachId.toLowerCase().includes(searchKey)



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

    jsPdfGenerator = () => {

        swal("Done!", "Your Report is Downloding!", "success")

        //new document in jspdf
        var doc = new jsPdf('l', 'pt', 'a3');

        doc.text(600, 20, 'Teacher Salary Report', { align: 'center' },);
        doc.autoTable({ html: '#payment-table' })

        doc.autoTable({
            columnStyles: { europe: { halign: 'center' } },
            margin: { top: 10 },
        })

        //save the pdf
        doc.save("Teacher Salary Details.pdf");
    }


    render() {
        return (
            <div className="container" >


                <div className='text-center'>
                    <h1 style={{
                        color: "#000080"
                    }}> Teacher Salary Details </h1></div>



                <div className="row">
                    <div className="col-lg-10 mt-2 mb-8">
                        <br></br>

                    </div>
                    <div className="col-lg-10 mt-2 mb-8">
                        <input
                            className="form-control"
                            style={{
                                fontSize: 'medium',
                                marginLeft: '150%'
                            }}
                            type="search"
                            placeholder="Search by Teacher ID / Name"
                            onChange={this.handleSearchArea}>


                        </input>
                        <br></br>
                    </div>
                </div>

                <table id="payment-table" className="table">
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




                                </tr>
                            ))}
                    </tbody>
                    <br />




                </table >
                <button className="btn btn-outline-primary" style={{
                    fontSize: 'medium',
                    marginRight: '80%'
                }} onClick={this.jsPdfGenerator}><b>Generate Report PDF</b></button>

            </div >

        )
    }
}

export default SalaryReport;