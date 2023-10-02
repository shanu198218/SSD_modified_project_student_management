import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from '../../action/axios';
import BG from '../../images/S.gif';


class StdpayUpdate extends Component {



    constructor(props) {
        super(props);
        this.state = {
            sfirstName: '',
            slastName: '',
            studentId: '',
            gradeLevel: '',
            mobiNum: '',
            email: '',
            parentName: '',
            payMethod: '',
            parentMnu: '',
            focus: '',

        }
    }


    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })

    }

    //update operation start here
    onSubmit = (e) => {

        e.preventDefault();

        const id = this.props.match.params.id;
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

        //validation start here
        const semail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const re = /^[0-9\b]+$/;
        if (sfirstName == "" || slastName == "" || studentId == "" || gradeLevel == "" || mobiNum == "" || email == "" || parentName == "" || payMethod == "" || parentMnu == "") {
            swal("Please fill the form correctly", "Form values cannot be empty", "error");
        }
        else if (studentId.length < 2) {
            swal("Invalid Student ID", "STD12345678 Student Id should be this type of pattern", "error");
        }
        else if (studentId.length > 12) {
            swal("Invalid Student ID", "STD12345678 Student Id should be this type of pattern", "error");
        }
        else if ((!re.test(String(mobiNum))) || (mobiNum.length != 10)) {
            swal("Invaid Contact Number", "There should be a valid pattern for contact number", "error");

        } else if ((!semail.test(String(email)))) {
            swal("Invalid email address !", "Please enter valid email address !", "error");

        }
        else if ((!re.test(String(parentMnu))) || (parentMnu.length != 10)) {
            swal("Invaid Parent Contact Number", "There should be a valid pattern for contact number", "error");

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

                        axios.put(`http://localhost:5000/stdpay/update/${id}`, data).then((res) => {

                            if (res.data.success) {

                                swal("Student Paymet updated successfully")

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
                        swal("Not Updated!");
                    }
                });


        }
    }

    componentDidMount() {

        const id = this.props.match.params.id;

        //retrive one value from database 
        axios.get(`http://localhost:5000/stdpay/${id}`).then((res) => {
            if (res.data.success) {


                this.setState({

                    sfirstName: res.data.stdPayPosts.sfirstName,
                    slastName: res.data.stdPayPosts.slastName,
                    studentId: res.data.stdPayPosts.studentId,
                    gradeLevel: res.data.stdPayPosts.gradeLevel,
                    mobiNum: res.data.stdPayPosts.mobiNum,
                    email: res.data.stdPayPosts.email,
                    parentName: res.data.stdPayPosts.parentName,
                    payMethod: res.data.stdPayPosts.payMethod,
                    parentMnu: res.data.stdPayPosts.parentMnu
                });

                console.log(this.state.stdPayPosts);
            }
        });


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
                                        <h2 className="text-center topic" style={{ color: '#000080', fontFamily: 'sans-serif', fontSize: '40px' }}>Student Payment Update </h2>
                                        <br></br>
                                        <form className="needs-validation" align="center"  >
                                            <label className="topic" style={{ marginLeft: '-72%' }}>Student First Name : </label>
                                            <div class="row">
                                                <div class="col-6" >
                                                    <input type="text"
                                                        className="form-control"
                                                        name="sfirstName"
                                                        value={this.state.sfirstName}
                                                        onChange={this.handleInputChange}

                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>

                                                <div className="form-group" style={{
                                                    width: '50%',
                                                    marginTop: '-4%',


                                                }}>
                                                    <label className="topic" style={{ marginLeft: '-45%' }}>Student Last Name : </label>

                                                    <div class="col-25" style={{}} >
                                                        <input type="text"
                                                            className="form-control"
                                                            name="slastName"
                                                            value={this.state.slastName}
                                                            onChange={this.handleInputChange}

                                                            style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                    </div>



                                                </div>
                                            </div>

                                            <label className="topic" style={{ marginLeft: '-60%' }}>Student Registration Number : </label>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text"
                                                        className="form-control"
                                                        name="studentId"
                                                        value={this.state.studentId}
                                                        onChange={this.handleInputChange}

                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>

                                                <div className="form-group" style={{
                                                    width: '30%',
                                                    marginTop: '-4%',

                                                }}>
                                                    <label className="topic" style={{ marginLeft: '-42%' }}>Grade Level : </label>
                                                    <select
                                                        className="form-control"
                                                        name="gradeLevel"
                                                        value={this.state.gradeLevel}
                                                        onChange={this.handleInputChange}
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }}
                                                    >

                                                        <option value="Select">Select</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option> </select>

                                                </div>
                                            </div>
                                            <label className="topic" style={{ marginLeft: '-78%' }}>Mobile Number : </label>
                                            <div class="row">
                                                <div class="col-6" style={{}}>
                                                    <input type="text"
                                                        className="form-control"
                                                        name="mobiNum"
                                                        value={this.state.mobiNum}
                                                        onChange={this.handleInputChange}
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>

                                                <div className="form-group" style={{
                                                    width: '50%',
                                                    marginTop: '-4%',


                                                }}>
                                                    <label className="topic" style={{ marginLeft: '-60%' }}>Email : </label>

                                                    <div class="col-25" style={{ marginLeft: '20px' }} >
                                                        <input type="text"
                                                            className="form-control"
                                                            name="email"
                                                            value={this.state.email}
                                                            onChange={this.handleInputChange}
                                                            style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                    </div>



                                                </div>
                                            </div>

                                            <label className="topic" style={{ marginLeft: '-80%' }}>Parent Name : </label>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text"
                                                        className="form-control"
                                                        name="parentName"
                                                        value={this.state.parentName}
                                                        onChange={this.handleInputChange}
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>


                                                <div className="form-group" style={{
                                                    width: '30%',
                                                    marginTop: '-4%',

                                                }}>

                                                    <label className="topic" >Payment Method : </label>
                                                    <select
                                                        className="form-control"
                                                        name="payMethod"
                                                        value={this.state.payMethod}
                                                        onChange={this.handleInputChange}
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }}
                                                    >

                                                        <option value="Select">Select</option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="Credit-card">Credit-card</option> </select>



                                                </div>

                                            </div>
                                            <br></br>
                                            <label className="topic" style={{ marginLeft: '-68%' }}>Parent Contact Number : </label>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text"
                                                        className="form-control"
                                                        name="parentMnu"
                                                        value={this.state.parentMnu}
                                                        onChange={this.handleInputChange}
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <div className="form-group">

                                                <br></br>
                                                <br></br>
                                                <button className="btn btn-success" type="submit" style={{ marginTop: '15px', fontSize: 'medium' }} onClick={this.onSubmit}>
                                                    <i className="far fa-check-square"></i>
                                                    &nbsp; UPDATE
                                                </button>
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
export default StdpayUpdate;