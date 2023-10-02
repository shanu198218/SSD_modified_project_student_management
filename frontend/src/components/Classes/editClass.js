import React, { Component } from 'react';
import axios from '../../action/axios';
import swal from 'sweetalert';

export default class editClass extends Component {


  constructor(props) {
    super(props);
    this.state = {
      subjectName: "",
      subjectCode: "",
      grade: "",
      teacherName: "",
      classType: "",
      hallNo: "",
      startDate: "",
      time: ""
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

    //Validation 

    if (subjectName === "" || subjectCode === "" || grade === "" || teacherName === "" || classType === "" || hallNo === "" || startDate === "" || time === "") {
      swal("Please fill the form correctly", "Form values cannot be empty", "error");
    }
    else if (subjectCode.length < 2) {
      swal("Invalid Research Field", "Length should be greater than 2", "error");
    }
    else if (hallNo.length > 15) {
      swal("Invalid Students' Group ID", "Length should not be greater than 15", "error");
    }

    else {

      axios.put(`/postClass/update/${id} `, data).then((res) => {

        if (res.data.success) {
          swal("Successful!", "Class Details Updated", "success");
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
      })
    }
  }

  componentDidMount() {

    const id = this.props.match.params.id;

    axios.get(`/postClass/${id}`).then((res) => {

      if (res.data.success) {
        this.setState({

          subjectName: res.data.post.subjectName,
          subjectCode: res.data.post.subjectCode,
          grade: res.data.post.grade,
          teacherName: res.data.post.teacherName,
          classType: res.data.post.classType,
          hallNo: res.data.post.hallNo,
          startDate: res.data.post.startDate,
          time: res.data.post.time

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
                  <h1 className="h3 mb-3 font-weight-normal" style={{ backgroundColor: '#d4eff9', marginTop: '40px', color: 'navy' }}><font face="Comic sans MS" size="6"><b>Update Class Details</b></font></h1><br />
                </center>
                <br />
                <form className="needs-validation" noValidate >
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}><b>Subject Name: </b></label>
                    <input type="text"
                      className="form-control"
                      name="subjectName"
                      placeholder="Enter Subject Name"
                      value={this.state.subjectName}
                      onChange={this.handleInputChange} required />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                    <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Subject Code:</b></label>
                    <input type="text"
                      className="form-control"
                      name="subjectCode"
                      placeholder="Enter Subject Code"
                      value={this.state.subjectCode}
                      onChange={this.handleInputChange} required />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                    <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Grade:</b></label>
                    <select
                      className="form-control"
                      style={{ marginBottom: '15px', maxWidth: '500px' }}
                      name="grade"
                      placeholder="Select Grade"
                      value={this.state.grade}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value="Select">Select</option>
                      <option value="10">10</option>
                      <option value="11">11</option> </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                    <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Teacher's Name: </b></label>
                    <input type="text"
                      className="form-control"
                      name="teacherName"
                      placeholder="Enter Teacher's Name"
                      value={this.state.teacherName}
                      onChange={this.handleInputChange} required />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                    <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Class Type:</b></label>
                    <select
                      className="form-control"
                      style={{ marginBottom: '15px', maxWidth: '500px' }}
                      name="classType"
                      placeholder="Select Class Type"
                      value={this.state.classType}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value="Select">Select</option>
                      <option value="Theory Group Class">Theory Group Class</option>
                      <option value="Theory Mass Class">Theory Mass Class</option>
                      <option value="Paper Group Class">Paper Group Class</option>
                      <option value="Paper Mass Class">Paper Mass Class</option>
                      <option value="Revision Class">Revision Class</option> </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                    <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Hall Number: </b></label>
                    <input type="text"
                      className="form-control"
                      name="hallNo"
                      placeholder="Enter hall number"
                      value={this.state.hallNo}
                      onChange={this.handleInputChange} required />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                    <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Start Date: </b></label>
                    <input type="text"
                      className="form-control"
                      name="startDate"
                      placeholder="Select Start Date"
                      value={this.state.startDate}
                      onChange={this.handleInputChange} required />
                  </div>

                  <div className="form-group" style={{ marginBottom: '15px' }}><br></br>
                    <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Time: </b></label>
                    <input type=""
                      className="form-control"
                      name="time"
                      placeholder="Enter day and time duration"
                      value={this.state.time}
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
