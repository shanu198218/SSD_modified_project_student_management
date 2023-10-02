import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from 'sweetalert';

export default class editnotice extends Component {

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

    onSubmit = (e) => {

        e.preventDefault();
        const id = this.props.match.params.id;

        const { noticeType, noticeDate, noticeTitle, noticeBody } = this.state;

        const data = {
            noticeType: noticeType,
            noticeDate: noticeDate,
            noticeTitle: noticeTitle,
            noticeBody: noticeBody
        }

        console.log(data)

        //Validation 

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

            axios.put(`/postNotice/update/${id} `, data).then((res) => {

                if (res.data.success) {
                    swal("Successful!", "Notice Details Updated", "success");
                    this.setState(
                        {
                            noticeType: "",
                            noticeDate: "",
                            noticeTitle: "",
                            noticeBody: ""

                        }
                    )
                }
            })
        }
    }

    componentDidMount() {

        const id = this.props.match.params.id;

        axios.get(`/postNotice/${id}`).then((res) => {

            if (res.data.success) {
                this.setState({

                    noticeType: res.data.post.noticeType,
                    noticeDate: res.data.post.noticeDate,
                    noticeTitle: res.data.post.noticeTitle,
                    noticeBody: res.data.post.noticeBody

                });
            }
        })

    }

    render() {
        return (


            <div className="container border"

                style={{

                    marginTop: "50px",

                    width: '50%',

                    backgroundImage: `url('http://media1.popsugar-assets.com/files/thumbor/q3C2ExePg-gSPSyOJL9GjZXGpIQ/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/09/23/953/n/1922507/c53f9968fdfddc03_pexels-eberhard-grossgasteiger-2310713/i/Pastel-Sky-iPhone-Wallpaper.jpg')`,

                    backgroundPosition: 'center',

                    backgroundSize: 'cover',

                }}>

                <div className="container">

                    <div className="cardU" style={{ marginTop: '40px' }}>
                        <div className="card-body">

                            <div className="col-md-8 mt-4 mx-auto">
                                <center>
                                    <h1 className="h3 mb-3 font-weight-normal" style={{ backgroundColor: '#d4eff9', marginTop: '40px', color: 'navy' }}><font face="Comic sans MS" size="6"><b>Update Notice Details</b></font></h1><br />
                                </center>
                                <br />
                                <form className="needs-validation" noValidate >
                                    <div className="form-group" style={{ marginBottom: '15px' }}>
                                        <label style={{ marginBottom: '5px' }}><b>Notice Type: </b></label>
                                        <select
                                            className="form-control"
                                            name="noticeType"
                                            placeholder="Select Notice Type"
                                            value={this.state.noticeType}
                                            onChange={this.handleInputChange} required >

                                            <option value="Select">Select</option>
                                            <option value="Subject Related Notice">Subject Related Notice</option>
                                            <option value="General Notice">General Notice</option>
                                            <option value="Other Notice">Other Notice</option> </select>

                                    </div>

                                    <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                                        <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Notice Date :</b></label>
                                        <input type="Date"
                                            className="form-control"
                                            name="noticeDate"
                                            placeholder="Select Notice Date"
                                            value={this.state.noticeDate}
                                            onChange={this.handleInputChange} required />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                                        <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Notice Title:</b></label>
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

                                    <button className="btn btn-primary" type="submit" style={{ marginTop: '15px', backgroundColor: '#000080' }} onClick={this.onSubmit}>
                                        <i className="far fa-check-square"></i>
                                        &nbsp; Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                </div>
            </div>
        )
    }
}
