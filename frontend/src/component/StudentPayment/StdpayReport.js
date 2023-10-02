import React, { Component } from 'react';
import axios from '../../action/axios';
import jsPdf from 'jspdf';
import 'jspdf-autotable';
import swal from 'sweetalert';

class StdpayReport extends Component {

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
            post.studentId.toLowerCase().includes(searchKey) ||
            post.email.toLowerCase().includes(searchKey) ||
            post.mobiNum.toLowerCase().includes(searchKey) ||
            post.gradeLevel.toLowerCase().includes(searchKey)

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

    jsPdfGenerator = () => {

        swal("Done!", "Your Report is Downloding!", "success")

        //new document in jspdf
        var doc = new jsPdf('l', 'pt', 'a3');

        doc.text(600, 20, 'Student Payment Details Report', { align: 'center' },);
        doc.autoTable({ html: '#payment-table' })

        doc.autoTable({
            columnStyles: { europe: { halign: 'center' } },
            margin: { top: 10 },
        })

        //save the pdf
        doc.save("Student Payments Details.pdf");
    }

    render() {
        return (
            <div className="container" >

                <div className='text-center'>
                    <h1 style={{
                        color: "#000080"
                    }}> Student Payment Details </h1></div>


                <div className="row">
                    <div className="col-lg-20 mt-2 mb-2"
                    >

                        <br></br>

                    </div>
                    <div className="col-lg-20 mt-2 mb-2">
                        <input
                            className="form-control"
                            style={{
                                fontSize: 'medium',
                                marginLeft: '90%'
                            }}
                            type="search"
                            placeholder="Search by Student ID"
                            onChange={this.handleSearchArea}>


                        </input>
                        <br></br>
                    </div>
                </div>


                <table id="payment-table" className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Student First Name</th>
                            <th scope="col">Student Last Name</th>
                            <th scope="col">Student ID</th>
                            <th scope="col">Grade Level</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Parent Name</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Parent Contact Number </th>



                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((posts, index) => (
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
                                <td>{posts.parentName}</td>
                                <td>{posts.payMethod}</td>
                                <td>{posts.parentMnu}</td>





                            </tr>
                        ))}

                    </tbody>

                </table>
                <button className="btn btn-outline-primary" style={{
                    fontSize: 'medium',
                    marginRight: '80%'
                }} onClick={this.jsPdfGenerator}><b>Generate Report PDF</b></button>

            </div>



        )
    }
}

export default StdpayReport;