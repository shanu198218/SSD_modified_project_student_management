import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from 'sweetalert';
import BG from '../../images/r2giphy.gif';

export default class createClass extends Component {

  //intialization

  constructor(props) {
    super(props);
    this.state = {
      subjectName: "",
      subjectCode: "",
      grade: "",
      teacherName: "",
      classType: "",
      hallNo: "",
      startDate:"",
      time:""
    }
  }

  handleInputChange = (e) => {
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]: value
    })

  }
  //save to database
  onSubmit = (e) => {

    e.preventDefault();

    const { subjectName, subjectCode, grade, teacherName, classType, hallNo, startDate, time } = this.state;

    const data = {
      subjectName: subjectName,
      subjectCode: subjectCode,
      grade: grade,
      teacherName: teacherName,
      classType: classType,
      hallNo: hallNo,
      startDate: startDate,
      time: time

    }

    console.log(data)

    //validation

    if (subjectName === "" || subjectCode === "" || grade === "" || teacherName === "" || classType === "" || hallNo === "" || startDate === "" || time === "") {
      swal("Please fill the form correctly", "Form values cannot be empty", "error");
    }
    else if (subjectCode.length < 2) {
      swal("Invalid Subject Code", "Length should be greater than 2", "error");
    }
    else if (grade.length > 3) {
      swal("Invalid Grade", "Choose a valid GRADE from drop down list; other than the word 'Select' ", "error");
    }
    else if (classType.length < 7) {
      swal("Invalid Class Type", "Choose a valid CLASS TYPE from drop down list; other than the word 'Select' ", "error");
    } 
    else if (hallNo.length > 8) {
      swal("Invalid Hall Number", "Length should not be greater than 8", "error");
    } 
    
    else {

      swal({
        title: "Are you sure?",
        text: `Subject Name: ${this.state.subjectName} | Subject Code: ${this.state.subjectCode} | Grade: ${this.state.grade} | Teacher's Name: ${this.state.teacherName} | Class Type: ${this.state.classType} | Hall Number: ${this.state.hallNo} | Start Date: ${this.state.startDate} | Time: ${this.state.time}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {

            axios.post("/postClass/save", data).then((res) => {
              if (res.data.success) {
                
                this.setState(
                  {
                    subjectName: "",
                    subjectCode: "",
                    grade: "",
                    teacherName: "",
                    classType: "",
                    hallNo: "",
                    startDate: "",
                    time: ""

                  }

                )

              }
            });
            swal("Class Details Added Successfully!", {
              icon: "success",
            });
          } else {
            swal("You clicked cancel button, addition not completed!");
          }
        });

    }
  }
  //Demo button
  demo = () => {

    //setState
    this.setState({
      subjectName: "ICT"
    })

    this.setState({
      subjectCode: "ICT05"
    })

    this.setState({
      grade: 10
    })

    this.setState({
      teacherName: "Miss Pragathika"
    })

    this.setState({
      classType: "Revision Class"
    })

    this.setState({
      hallNo: "E05"
    })

    this.setState({
      startDate: "07/09/2022"
    })

    this.setState({
      time: "Wednesday 3.30 pm -5.30 pm"
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
                      <marquee direction="left"><p className="display-3 " style = {{color:'#8b4513'}}><b>Enter New Class Details Here !</b></p></marquee>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <img className="r2giphy.gif" src={BG} alt='bg img' style={{ width: "75%", height: "50%", marginTop: "100px", marginLeft: "140px" }} />
          </div>

          <div className="col-6">

            <div style={{ marginTop: "2%" }}>
              <div className="myformstyle" style={{ width: "95%", marginLeft: "0px" }}>

                <div className="card-body">
                  <div className="col-md-8 mt-4 mx-auto">
                    <h1 className="text-center topic" style = {{color:'#00008b'}}>Add Class Details</h1>
                    <br></br>

                    <form className="needs-validation" align="center" style={{ width: "110%", borderStyle: "solid", borderWidth:"5px", boxShadow: "0 8px 350px 0 rgba(0, 0, 0, 0.5)", alignContent:"center", borderColor:"navy"}} noValidate >
                      <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                        <label style={{ marginBottom: '5px',fontSize:'19px' }} className="topic"><b>Subject Name: </b></label>
                        <input type="text"
                          className="form-control"
                          name="subjectName"
                          placeholder="Enter Subject Name"
                          value={this.state.subjectName}
                          onChange={this.handleInputChange} required />
                      </div>

                      <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                        <label style={{ marginBottom: '5px',fontSize:'19px' }} className="topic"><b>Subject Code:</b></label>
                        <input type="text"
                          className="form-control"
                          name="subjectCode"
                          placeholder="Enter Subject Code"
                          value={this.state.subjectCode}
                          onChange={this.handleInputChange} required />
                      </div>

                      <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                        <label style={{ marginBottom: '5px',fontSize:'19px' }} className="topic"><b>Grade:</b></label>
                        <select
                      className="form-control"
                      style ={{marginBottom:'15px', maxWidth:'500px'}}
                      name="grade"
                      placeholder="Select Grade"
                      value={this.state.grade}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value = "Select">Select</option>
                      <option value = "10">10</option>
                      <option value = "11">11</option> </select>
                      </div>

                      <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                        <label style={{ marginBottom: '5px',fontSize:'19px' }} className="topic"><b>Teacher's Name: </b></label>
                        <input type="text"
                          className="form-control"
                          name="teacherName"
                          placeholder="Enter Teacher's Name"
                          value={this.state.teacherName}
                          onChange={this.handleInputChange} required />
                      </div>

                      <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                        <label style={{ marginBottom: '5px',fontSize:'19px' }} className="topic"><b>Class Type:</b></label>
                        <select
                      className="form-control"
                      style ={{marginBottom:'15px', maxWidth:'500px'}}
                      name="classType"
                      placeholder="Select Class Type"
                      value={this.state.classType}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value = "Select">Select</option>
                      <option value = "Theory Group Class">Theory Group Class</option>
                      <option value = "Theory Mass Class">Theory Mass Class</option>
                      <option value = "Paper Group Class">Paper Group Class</option>
                      <option value = "Paper Mass Class">Paper Mass Class</option> 
                      <option value = "Revision Class">Revision Class</option> </select>
                      </div>

                      <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                        <label style={{ marginBottom: '5px',fontSize:'19px' }} className="topic"><b>Hall Number: </b></label>
                        <input type="text"
                          className="form-control"
                          name="hallNo"
                          placeholder="Enter hall number"
                          value={this.state.hallNo}
                          onChange={this.handleInputChange} required />
                      </div>

                      <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                        <label style={{ marginBottom: '5px',fontSize:'19px' }} className="topic"><b>Start Date: </b></label>
                        <input type="Date"
                          className="form-control"
                          name="startDate"
                          placeholder="Select Start Date"
                          value={this.state.startDate}
                          onChange={this.handleInputChange} required/>
                      </div>

                      <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                        <label style={{ marginBottom: '5px',fontSize:'19px' }} className="topic"><b>Time: </b></label>
                        <input type=""
                          className="form-control"
                          name="time"
                          placeholder="Enter day and time duration"
                          value={this.state.time}
                          onChange={this.handleInputChange} required/>
                      </div>

                      <button type="button" class="btn btn-outline-danger" onClick={this.demo} > Demo </button>
                      <br />
                      <button className="btn btn-primary" type="submit" style={{ marginTop: '15px', backgroundColor: '#000080' }} onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Submit Class Details
                      </button>

                      <br />
                      <button className="btn btn-outline-success" type="submit" style={{ marginTop: '15px', backgroundColor: '#410061' }} ><a href="/emailTeacher"> 
                        Inform Teachers Via An Email</a></button>

                        <br />
                      <button className="btn btn-outline-warning" type="submit" style={{ marginTop: '15px' }} ><a href="/classHome"> <i className="far fa-check-square" style={{ textDecoration: "none" }}></i>
                        &nbsp; View Class Table</a></button>

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

