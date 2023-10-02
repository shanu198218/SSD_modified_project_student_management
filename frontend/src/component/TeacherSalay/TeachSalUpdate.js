import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from '../../action/axios';
import BG from '../../images/teacher.gif';


class TeachSalUpdate extends Component {



    constructor(props) {
        super(props);
        this.state = {
            teachName: '',
            teachId: '',
            workingday: '',
            leaveDay: '',
            epf: '',
            basicsal: '',
            deparment: '',
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


    onSubmit = (e) => {

        e.preventDefault();

        const id = this.props.match.params.id;
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

        // //validation start here
        //validation
        if (teachName == "" || teachId == "" || workingday == "" || leaveDay == "" || epf == "" || basicsal == "" || deparment == "") {
            swal("Please fill the form correctly", "Form values cannot be empty", "error");
        }
        else if (teachId.length < 2) {
            swal("Invaid Teacher ID", "Teacher id Length should be greater than 2", "error");
        }
        else if (teachId.length < 8) {
            swal("Invaid Teacher ID", "Teacher id Length should be 10 number or character", "error");
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

                        axios.put(`http://localhost:5000/teacsal/update/${id}`, data).then((res) => {

                            if (res.data.success) {

                                swal("Teachers Salary updated successfully")

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
                        swal("Teacher Salary Details Update Successfully!", {
                            icon: "success",
                        });
                        this.props.history.push('#');
                    } else {
                        swal("Not Updated!");
                    }
                });


        }
    }

    componentDidMount() {

        const id = this.props.match.params.id;

        //post/${id}/
        axios.get(`http://localhost:5000/teacsal/${id}`).then((res) => {
            if (res.data.success) {


                this.setState({

                    teachName: res.data.teachsalpost.teachName,
                    teachId: res.data.teachsalpost.teachId,
                    workingday: res.data.teachsalpost.workingday,
                    leaveDay: res.data.teachsalpost.leaveDay,
                    epf: res.data.teachsalpost.epf,
                    basicsal: res.data.teachsalpost.basicsal,
                    deparment: res.data.teachsalpost.deparment,

                });

                console.log(this.state.teachsalpost);
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
                        <img className="S.gif" src={BG} alt='bg img' style={{ height: "70%", marginTop: "20px", marginLeft: "70px" }} />


                    </div>

                    <div class="col-md-9 mt-4 mx-auto" style={{
                        width: '40%',
                    }}>

                        <div style={{ marginTop: "0%" }}>
                            <div className="myformstyle" style={{ width: "140%", marginLeft: "-10px" }}>

                                <div className="card-body">
                                    <div className="col-md-10 mt-3 mx-auto">
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

                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>


                                                <label style={{ marginBottom: '5px', marginLeft: '-38%' }} className="topic">Teacher ID : </label>

                                                <div class="col-9"  >
                                                    <input type="text"
                                                        className="form-control"
                                                        name="teachId"
                                                        placeholder="Enter Last Name"
                                                        value={this.state.teachId}
                                                        onChange={this.handleInputChange}

                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>




                                            </div>

                                            <label style={{ marginBottom: '5px', marginLeft: '-76%' }} className="topic">Working Days : </label>
                                            <div class="row">
                                                <div class="col-9">
                                                    <input type="number"
                                                        className="form-control"
                                                        name="workingday"
                                                        placeholder="Working Dayas"
                                                        value={this.state.workingday}
                                                        onChange={this.handleInputChange}

                                                        style={{ textAlign: 'center', textDecoration: 'none', fontSize: 'medium' }} />
                                                </div>
                                                <br></br>
                                                <br></br>


                                                <label style={{ marginBottom: '5px', marginLeft: '-38%' }} className="topic">Leave Days : </label>
                                                <div class="col-9">
                                                    <input type="number"
                                                        className="form-control"
                                                        name="leaveDay"
                                                        placeholder="Leave Dayas"
                                                        value={this.state.leaveDay}
                                                        onChange={this.handleInputChange}

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
                                                    >

                                                        <option value="Select">Select</option>
                                                        <option value="A/L">A/L</option>
                                                        <option value="O/L">O/L</option> </select>





                                                </div>
                                            </div>

                                            <br></br>
                                            <div className="form-group">

                                                <button className="btn btn-success" type="submit" style={{ marginTop: '15px', marginLeft: '-22%' }} onClick={this.onSubmit}>
                                                    <i className="far fa-check-square"></i>
                                                    &nbsp; UPDATE
                                                </button>

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
export default TeachSalUpdate;