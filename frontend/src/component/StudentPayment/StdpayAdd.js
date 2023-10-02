import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from 'sweetalert';
import BG from '../../images/S.gif';


export default class StdpayAdd extends Component {

    //intialization

    constructor(props) {
        super(props);
        this.state = {
            sfirstName: "",
            slastName: "",
            studentId: "",
            gradeLevel: "",
            mobiNum: "",
            email: "",
            parentName: "",
            payMethod: "",
            parentMnu: "",
        }
    }


    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })

    }
    //save to db
    onSubmit = (e) => {

        e.preventDefault();

        const { sfirstName, slastName, studentId, gradeLevel, mobiNum, email, parentName, payMethod, parentMnu } = this.state;

        const data = {
            sfirstName: sfirstName,
            slastName: slastName,
            studentId: studentId,
            gradeLevel: gradeLevel,
            mobiNum: mobiNum,
            email: email,
            parentName: parentName,
            payMethod: payMethod,
            parentMnu: parentMnu,

        }

        console.log(data)

        //validation
        const semail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const re = /^[0-9\b]+$/;
        const parentname = /^[a-zA-Z]/;

        if (sfirstName == "" || slastName == "" || studentId == "" || gradeLevel == "" || mobiNum == "" || email == "" || parentName == "" || payMethod == "" || parentMnu == "") {
            swal("Please fill the form correctly", "Form values cannot be empty", "error");
        }
        else if (studentId.length < 11) {
            swal("Invalid Student ID", "STD length should be 11 character & Number", "error");
        }
        else if (studentId.length >11) {
            swal("Invalid Student ID", "STD length should be 11 character & Number ", "error");
        }
        else if ((!re.test(String(mobiNum))) || (mobiNum.length != 10)) {
            swal("Invalid Contact Number", "There should be a valid pattern for contact number", "error");

        } else if ((!semail.test(String(email)))) {
            swal("Invalid email address !", "Please enter valid email address !", "error");

        }
        else if ((!re.test(String(parentMnu))) || (parentMnu.length != 10)) {
            swal("Invalid Parent Contact Number", "There should be a valid pattern for contact number", "error");

        }else if ((!parentname.test(String(parentName)))) {
            swal("Invalid  Parent Name ", "There should be character", "error");

        }else if ((!parentname.test(String(sfirstName)))) {
            swal("Invalid  Student First Name ", "There should be character", "error");

        }else if ((!parentname.test(String(slastName)))) {
            swal("Invalid  Student Last Name", "There should be character", "error");

        }
        else if (payMethod.length > 4) {
            swal("Invalid Payment Method", "Choose a valid Payment Method from drop down list; other than the word 'Select' ", "error");
          }
          else if (gradeLevel.length > 2) {
            swal("Invalid Grade Level", "Choose a valid Grade level from drop down list; other than the word 'Select' ", "error");
          }
        
        else {

            swal({
                title: "Are you sure?",
                text: `Student First name: ${this.state.sfirstName} |Student Last name: ${this.state.slastName} | Student ID.: ${this.state.studentId} | Grade Level: ${this.state.gradeLevel} | Student Mobile Number: ${this.state.mobiNum} | Email: ${this.state.email} | Parent Name: ${this.state.parentName} | Payment Method: ${this.state.payMethod} | Parent Number : ${this.state.parentMnu}`,
                icon: "info",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        axios.post("http://localhost:5000/stdpay/save", data).then((res) => {
                            if (res.data.success) {

                                this.setState(
                                    {
                                        sfirstName: "",
                                        slastName: "",
                                        studentId: "",
                                        gradeLevel: "",
                                        mobiNum: "",
                                        email: "",
                                        parentName: "",
                                        payMethod: "",
                                        parentMnu: "",

                                    }

                                )

                            }
                        })
                        swal("Student Payment Details Added Successfully!", {
                            icon: "success",
                        });
                        this.props.history.push('/success');
                    } else {
                        swal("Not completed!");
                    }
                });

        }
    }
    demo = () => {

        //setState
        this.setState({
            sfirstName: "Shanu"
        })

        this.setState({
            slastName: "Dilrukshi"
        })

        this.setState({
            studentId: "STD20147859"
        })

        this.setState({
            gradeLevel: "10"
        })
        this.setState({
            mobiNum: "0710101010"
        })
        this.setState({
            email: "mgshamalidilrukshi@gmail.com"
        })
        this.setState({
            parentName: "Nimal De Silva"
        })
        this.setState({
            payMethod: "Card"
        })
        this.setState({
            parentMnu: "0112415236"
        })

    }

    render() {
        return (
            <div>
                <div class="row" >
                    <div class="col-5" >

                        <section id="hire">
                            <div className="topic">
                                <div class="container-fluid">
                                    <div class="Jumbotron jumbotron-fluid">
                                        <div className="container hire">
                                            <br />
                                            <marquee direction="left"><p class="display-3 " style={{ color: '#000080' }}>NANASA Education Center !</p></marquee>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <img className="S.gif" src={BG} alt='bg img' style={{ height: "50%", marginTop: "50px", marginRight: "5px" }} />


                    </div>

                    <div class="col-md-9 mt-4 mx-auto" style={{

                        width: '40%',
                    }}>

                        <div style={{ marginTop: "0%" }}>
                            <div className="myformstyle" style={{ width: "140%", marginLeft: "-120px" }}>

                                <div className="card-body">
                                    <div className="col-md-9 mt-4 mx-auto">
                                        <h2 className="text-center topic" style={{ color: '#000080', fontFamily: 'sans-serif', fontSize: '40px' }}>Student Payment Registration </h2>
                                        <br></br>
                                        <form className="needs-validation" align="center" >
                                            <label style={{ marginLeft: '-72%' }} className="topic">Student First Name : </label>
                                            <div class="row">
                                                <div class="col-6" >
                                                    <input type="text"
                                                        className="form-control"
                                                        name="sfirstName"
                                                        placeholder="Enter First Name"
                                                        value={this.state.sfirstName}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>

                                                <div className="form-group" style={{
                                                    width: '50%',
                                                    marginTop: '-4%',


                                                }}>
                                                    <label style={{ marginLeft: '-45%' }} className="topic">Student Last Name : </label>

                                                    <div class="col-25"  >
                                                        <input type="text"
                                                            className="form-control"
                                                            name="slastName"
                                                            placeholder="Enter Last Name"
                                                            value={this.state.slastName}
                                                            onChange={this.handleInputChange}
                                                            required
                                                            style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                    </div>



                                                </div>
                                            </div>

                                            <label style={{ marginLeft: '-60%' }} className="topic">Student Registration Number : </label>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text"
                                                        className="form-control"
                                                        name="studentId"
                                                        placeholder="STD****"
                                                        value={this.state.studentId}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>

                                                <div className="form-group" style={{
                                                    width: '30%',
                                                    marginTop: '-4%',

                                                }}>
                                                    <label style={{ marginBottom: '5px' }} className="topic">Grade Level : </label>
                                                    <select
                                                        className="form-control"
                                                        name="gradeLevel"
                                                        placeholder="Select Grade"
                                                        value={this.state.gradeLevel}
                                                        onChange={this.handleInputChange}
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }}
                                                        required>

                                                        <option value="Select">Select</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option> </select>

                                                </div>
                                            </div>
                                            <label style={{ marginLeft: '-42%' }} className="topic">Mobile Number : </label>
                                            <div class="row">
                                                <div class="col-6" >
                                                    <input type="text"
                                                        className="form-control"
                                                        name="mobiNum"
                                                        placeholder="Enter Mobile Number"
                                                        value={this.state.mobiNum}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>

                                                <div className="form-group" style={{
                                                    width: '50%',
                                                    marginTop: '-4%',


                                                }}>
                                                    <label style={{ marginLeft: '-60%' }} className="topic">Email : </label>

                                                    <div class="col-25" style={{ marginLeft: '20px' }} >
                                                        <input type="text"
                                                            className="form-control"
                                                            name="email"
                                                            placeholder="Enter Email"
                                                            value={this.state.email}
                                                            onChange={this.handleInputChange}
                                                            required
                                                            style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                    </div>



                                                </div>
                                            </div>

                                            <label style={{ marginLeft: '-80%' }} className="topic">Parent Name : </label>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text"
                                                        className="form-control"
                                                        name="parentName"
                                                        placeholder="Enter Parent Name"
                                                        value={this.state.parentName}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>


                                                <div className="form-group" style={{
                                                    width: '30%',
                                                    marginTop: '-4%',

                                                }}>
                                                    <label style={{ marginBottom: '5px' }} className="topic">Payment Method : </label>
                                                    <select
                                                        className="form-control"
                                                        name="payMethod"
                                                        placeholder="Choose Payment"
                                                        value={this.state.payMethod}
                                                        onChange={this.handleInputChange}
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }}
                                                        required>

                                                        <option value="Select">Select</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="Card">Card</option> </select>



                                                </div>

                                            </div>
                                            <label style={{ marginLeft: '-68%' }} className="topic">Parent Contact Number : </label>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text"
                                                        className="form-control"
                                                        name="parentMnu"
                                                        placeholder="Enter Parent Number"
                                                        value={this.state.parentMnu}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <div className="form-group">
                                                <button type="button" onClick={this.demo} style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} class="btn btn-outline-info" > Demo </button>
                                                <br></br>
                                                <br></br>
                                                <button type="button" style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} class="btn btn-outline-success" onClick={this.onSubmit} > Add Student Payment Details </button>
                                                <br></br>
                                                <br></br>

                                            </div>


                                        </form>



                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>





                </div >
                <br />
                <br />



            </div >
        )
    }
}