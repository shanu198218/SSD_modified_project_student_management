import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from 'sweetalert';
import BG from '../../images/teacher.gif';


export default class TeacherSalAdd extends Component {

    //intialization

    constructor(props) {
        super(props);
        this.state = {
            teachName: "",
            teachId: "",
            workingday: "",
            leaveDay: "",
            epf: "",
            basicsal: "",
            deparment: "",

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

        const { teachName, teachId, workingday, leaveDay, epf, basicsal, deparment } = this.state;

        const data = {
            teachName: teachName,
            teachId: teachId,
            workingday: workingday,
            leaveDay: leaveDay,
            epf: epf,
            basicsal: basicsal,
            deparment: deparment,


        }

        console.log(data)

        //validation
        const parentname = /^[a-zA-Z]/;
        const number = /\-?\d*\.?\d{1,2}/;
        const re = /^[0-9\b]+$/;

        if (teachName == "" || teachId == "" || workingday == "" || leaveDay == "" || epf == "" || basicsal == "" || deparment == "") {
            swal("Please fill the form correctly", "Form values cannot be empty", "error");
        }
        else if (teachId.length < 11) {
            swal("Invaid Teacher ID", "Teacher id Length should be 11 number or character", "error");
        }
        else if (teachId.length > 11) {
            swal("Invaid Teacher ID", "Teacher id Length should be 11 number or character", "error");
        }
        else if ((!parentname.test(String(teachName)))) {
            swal("Invalid Teacher name", "There should be character", "error");

        }
        else if ((!number.test(String(workingday)))) {
            swal("Invalid Woring day", "There should be number format", "error");

        }
        else if ((!number.test(String(leaveDay)))) {
            swal("Invalid leaveDay day", "There should be number format", "error");

        }
        else if (deparment.length > 3) {
            swal("Invalid Department", "Choose a valid Department from drop down list; other than the word 'Select' ", "error");
        }
        else if ((!number.test(String(epf)))) {
            swal("Invalid epf", "There should be price format", "error");

        }
        else if ((!number.test(String(basicsal)))) {
            swal("Invalid basic salary", "There should be price format", "error");

        }

        else {

            swal({
                title: "Are you sure?",
                text: `Teacher Name: ${this.state.teachName} |Teacher ID: ${this.state.teachId} | Working Days: ${this.state.workingday} | Leave Days: ${this.state.leaveDay} | EPF: ${this.state.epf} | Basic Salary: ${this.state.basicsal} | Department Name: ${this.state.deparment} `,
                icon: "info",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {

                        axios.post("http://localhost:5000/teacsal/save", data).then((res) => {
                            if (res.data.success) {

                                this.setState(
                                    {
                                        teachName: "",
                                        teachId: "",
                                        workingday: "",
                                        leaveDay: "",
                                        epf: "",
                                        basicsal: "",
                                        deparment: "",


                                    }

                                )

                            }
                        })
                        swal("Teacher Salary Details Added Successfully!", {
                            icon: "success",
                        });
                        this.props.history.push('#');
                    } else {
                        swal("Not completed!");
                    }
                });

        }
    }
    demo = () => {

        //setState
        this.setState({
            teachName: "Mihiranga De silva"
        })

        this.setState({
            teachId: "TID20147859"
        })

        this.setState({
            workingday: "20"
        })

        this.setState({
            leaveDay: "5"
        })
        this.setState({
            epf: "699.75"
        })
        this.setState({
            basicsal: "35000.00"
        })
        this.setState({
            deparment: "O/L"
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
                        <img className="S.gif" src={BG} alt='bg img' style={{ height: "70%", marginTop: "20px", marginLeft: "70px" }} />


                    </div>

                    <div class="col-md-9 mt-4 mx-auto" style={{
                        width: '40%',
                    }}>

                        <div style={{ marginTop: "0%" }}>
                            <div className="myformstyle" style={{ width: "140%", marginLeft: "-10px" }}>

                                <div className="card-body">
                                    <div className="col-md-9 mt-4 mx-auto">
                                        <br></br>
                                        <h2 className="text-center topic" style={{ color: '#000080', fontFamily: 'sans-serif', fontSize: '30px', marginLeft: '-22%' }}>Teachers Salary Registration Form </h2>

                                        <form className="needs-validation" align="center" style={{ width: "100%" }} >
                                            <label style={{ marginBottom: '5px', marginLeft: '-75%' }} className="topic">Teacher Name : </label>
                                            <div class="row">
                                                <div class="col-9" >
                                                    <input type="text"
                                                        className="form-control"
                                                        name="teachName"
                                                        placeholder="Enter First Name"
                                                        value={this.state.teachName}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>


                                                <label style={{ marginBottom: '5px', marginLeft: '-38%' }} className="topic">Teacher ID : </label>

                                                <div class="col-9"  >
                                                    <input type="text"
                                                        className="form-control"
                                                        name="teachId"
                                                        placeholder="Enter Teacher ID"
                                                        value={this.state.teachId}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>




                                            </div>

                                            <label style={{ marginBottom: '5px', marginLeft: '-76%' }} className="topic">Working Days : </label>
                                            <div class="row">
                                                <div class="col-9">
                                                    <input type="string"
                                                        className="form-control"
                                                        name="workingday"
                                                        placeholder="Working Dayas"
                                                        value={this.state.workingday}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>


                                                <label style={{ marginBottom: '5px', marginLeft: '-38%' }} className="topic">Leave Days : </label>
                                                <div class="col-9">
                                                    <input type="string"
                                                        className="form-control"
                                                        name="leaveDay"
                                                        placeholder="Leave Dayas"
                                                        value={this.state.leaveDay}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />


                                                </div>
                                            </div>
                                            <label style={{ marginBottom: '5px', marginLeft: '-90%' }} className="topic">EPF : </label>
                                            <div class="row">
                                                <div class="col-9" >
                                                    <input type="text"
                                                        className="form-control"
                                                        name="epf"
                                                        placeholder="EPF"
                                                        value={this.state.epf}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>


                                                <label style={{ marginBottom: '5px', marginLeft: '-38%' }} className="topic">Basic Salary : </label>

                                                <div class="col-9"  >
                                                    <input type="text"
                                                        className="form-control"
                                                        name="basicsal"
                                                        placeholder="Enter Basic Salary"
                                                        value={this.state.basicsal}
                                                        onChange={this.handleInputChange}
                                                        required
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>



                                            </div>


                                            <div class="row">


                                                <div class="col-9"  >

                                                    <label style={{ marginBottom: '5px', marginLeft: '-71%' }} className="topic">Department : </label>
                                                    <select
                                                        className="form-control"
                                                        name="deparment"
                                                        placeholder="Working Department"
                                                        value={this.state.deparment}
                                                        onChange={this.handleInputChange}
                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }}
                                                        required>

                                                        <option value="Select">Select</option>
                                                        <option value="A/L">A/L</option>
                                                        <option value="O/L">O/L</option> </select>





                                                </div>
                                            </div>

                                            <br></br>
                                            <div className="form-group">

                                                <button type="button" onClick={this.demo} style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium', marginLeft: '-22%' }} class="btn btn-outline-info" > Demo </button>
                                                <br></br>
                                                <br></br>
                                                <button type="button" style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium', marginLeft: '-22%' }} class="btn btn-outline-success" onClick={this.onSubmit} > Add Teacher Salary Details </button>
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