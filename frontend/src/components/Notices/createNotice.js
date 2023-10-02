import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from 'sweetalert';
import BG from '../../images/n2giphy.gif';

export default class createNotice extends Component {

    //intialization

    constructor(props) {
        super(props);
        this.state = {
            noticeType: "",
            noticeDate: "",
            noticeTitle: "",
            noticeBody: ""
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })

    }
    //save to database
    onSubmit = (e) => {

        e.preventDefault();

        const { noticeType, noticeDate, noticeTitle, noticeBody } = this.state;

        const data = {
            noticeType: noticeType,
            noticeDate: noticeDate,
            noticeTitle: noticeTitle,
            noticeBody: noticeBody

        }

        console.log(data)

        //validation

        if (noticeType === "" || noticeDate === "" || noticeTitle === "" || noticeBody === "") {
            swal("Please fill the form correctly", "Form values cannot be empty", "error");
        }
        else if (noticeType.length < 7) {
            swal("Invalid Notice Type", "Choose a valid NOTICE TYPE from drop down list; other than the word 'Select' ", "error");
        }
        else if (noticeTitle.length < 2) {
            swal("Invalid Notice Title", "Length should be greater than 2", "error");
        }

        else {

            swal({
                title: "Are you sure?",
                text: `Notice Type: ${this.state.noticeType} | Notice Date: ${this.state.noticeDate} | Notice Title: ${this.state.noticeTitle} | Notice Body: ${this.state.noticeBody}`,
                icon: "info",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        axios.post("/postNotice/save", data).then((res) => {
                            if (res.data.success) {

                                this.setState(
                                    {
                                        noticeType: "",
                                        noticeDate: "",
                                        noticeTitle: "",
                                        noticeBody: ""
                                    }
                                )
                            }
                        });
                        swal("Notice Added Successfully!", {
                            icon: "success",
                        });
                    } else {
                        swal("You clicked cancel button, Addition not completed!");
                    }
                });

        }
    }
    //Demo button
    demo = () => {

        //setState
        this.setState({
            noticeType: "Subject Related Notice"
        })

        this.setState({
            noticeDate: "10/10/2022"
        })

        this.setState({
            noticeTitle: "Re-scheduling the cancelled Enlish class on Sunday"
        })

        this.setState({
            noticeBody: "Last week's cancelled English class which is normally held on Thursday 2.30 pm to 5.30 pm will be re-scheduled to next Sunday 2.30pm - 5.30 pm."
        })

    }

    render() {
        return (
            <div>
                <div className="row" >
                    <div className="col-6" >
                        <section id="hire">
                            <div className="topic" style={{ marginTop: "5%" }}>
                                <div className="container-fluid">
                                    <div className="Jumbotron jumbotron-fluid">
                                        <div className="container hire">
                                            <br />
                                            <marquee direction="left"><p className="display-3 " style={{ color: '#8b4513' }}><b>Add New Notices Here !</b></p></marquee>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <img className="n2giphy.gif" src={BG} alt='bg img' style={{ width: "80%", height: "50%", marginTop: "50px", marginLeft: "140px" }} />
                    </div>

                    <div className="col-6">

                        <div style={{ marginTop: "2%" }}>
                            <div className="myformstyle" style={{ width: "95%", marginLeft: "0px" }}>

                                <div className="card-body">
                                    <div className="col-md-8 mt-4 mx-auto">
                                        <h1 className="text-center topic" style={{ color: '#00008b' }}>Add Notices</h1>
                                        <br></br>

                                        <form className="needs-validation" align="center" style={{ width: "120%", borderStyle: "solid", borderWidth: "5px", boxShadow: "0 8px 350px 0 rgba(0, 0, 0, 0.5)", alignContent: "center", borderColor: "navy" }} noValidate >

                                            <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                                                <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Notice Type:</b></label>
                                                <select
                                                    className="form-control"
                                                    style={{ marginBottom: '15px', maxWidth: '500px' }}
                                                    name="noticeType"
                                                    placeholder="Select Notice Type"
                                                    value={this.state.noticeType}
                                                    onChange={this.handleInputChange}
                                                    required
                                                >
                                                    <option value="Select">Select</option>
                                                    <option value="Subject Related Notice">Subject Related Notice</option>
                                                    <option value="General Notice">General Notice</option>
                                                    <option value="Other Notice">Other Notice</option> </select>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                                                <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Notice Date: </b></label>
                                                <input type="Date"
                                                    className="form-control"
                                                    name="noticeDate"
                                                    placeholder="Select Notice Date"
                                                    value={this.state.noticeDate}
                                                    onChange={this.handleInputChange} required />
                                            </div>

                                            <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                                                <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Notice Title: </b></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="noticeTitle"
                                                    placeholder="Enter Notice Title"
                                                    value={this.state.noticeTitle}
                                                    onChange={this.handleInputChange} required />
                                            </div>

                                            <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                                                <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Notice Body: </b></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="noticeBody"
                                                    placeholder="Enter Notice Body"
                                                    value={this.state.noticeBody}
                                                    onChange={this.handleInputChange} required />
                                            </div>

                                            <button type="button" class="btn btn-outline-danger" onClick={this.demo} > Demo </button>
                                            <br />
                                            <button className="btn btn-primary" type="submit" style={{ marginTop: '15px', backgroundColor: '#000080' }} onClick={this.onSubmit}>
                                                <i className="far fa-check-square"></i>
                                                &nbsp; Publish Notice
                                            </button>

                                            <br />
                                            <button className="btn btn-outline-warning" type="submit" style={{ marginTop: '15px' }} ><a href="/fetchNotice"> <i className="far fa-check-square" style={{ textDecoration: "none" }}></i>
                                                &nbsp; View All Notices</a></button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </div>
        )
    }
}

