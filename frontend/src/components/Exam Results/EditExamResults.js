import React, { Component } from "react";
import axios from "../../action/axios";
import swal from "sweetalert";

export default class EditExamResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: "",
      subject: "",
      studentName: "",
      studentID: "",
      marks: "",
      gradeReceived: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const {
      grade,
      subject,
      studentName,
      studentID,
      marks,
      gradeReceived,
    } = this.state;

    const data = {
      grade: grade,
      subject: subject,
      studentName: studentName,
      studentID: studentID,
      marks: marks,
      gradeReceived: gradeReceived,
    };

    console.log(data);

    const re = /[s,S]+[0-9]{3}/;

    if (
      grade === "" ||
      subject === "" ||
      studentName === "" ||
      studentID === "" ||
      marks === "" ||
      gradeReceived === ""
    ) {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );


    } else if (
      !re.test(String(studentID)) ||
      studentID.length !== 4
    ) {
      swal(
        "Invaid Student Registration Number!",
        "There should be a valid pattern for Student Registration number",
        "error"
      );


    } else if (marks > 100 || marks < 0) {
      swal("Invalid Marks", "Enter valid mark between 0 and 100", "error");
    } else {
      swal({
        title: "Are you sure?",
        text: `Grade: ${this.state.grade} | Subject: ${this.state.subject} | Student Name: ${this.state.studentName} 
        Student ID: ${this.state.studentID} | Marks: ${this.state.marks} | Grade: ${this.state.gradeReceived}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.put(`http://localhost:5000/result/update/${id}`, data).then((res) => {
            if (res.data.success) {
              this.setState({
                grade: "",
                subject: "",
                studentName: "",
                studentID: "",
                marks: "",
                gradeReceived: "",
              });
            }
          });
          swal("Exam Result Updated Successfully!", {
            icon: "success",
          });
        } else {
          swal("Exam Result Updation is not completed!");
        }
      });
    }
  };


  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/result/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          grade: res.data.result.grade,
          subject: res.data.result.subject,
          studentName: res.data.result.studentName,
          studentID: res.data.result.studentID,
          marks: res.data.result.marks,
          gradeReceived: res.data.result.gradeReceived,
        });
        console.log(this.state.results);
      }
    });
  }

  render() {
    return (
      <div className="container" style={{ width: "540px" }}>
        <h1
          className="text-center"
          style={{
            borderStyle: "solid",
            backgroundColor: "MidnightBlue",
            color: "white",
          }}
        >
          Update Exam Results
        </h1>
        <br></br>
        <form>



          <div className="form-group">
            <div className="form-group">


              <div className="form-group" style={{ marginBottom: '15px', width: '400px' }}><br></br>
                <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Grade:</b></label>
                <select
                  className="form-control"
                  style={{ marginBottom: '15px', maxWidth: '580px' }}
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

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Subject:</b></label>
                <select
                  className="form-control"
                  style={{ marginBottom: '15px', maxWidth: '580px' }}
                  name="subject"
                  placeholder="Select Subject"
                  value={this.state.subject}
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="Select Subject">Select</option>
                  <option value="Science">Science</option>
                  <option value="Maths">Maths</option>
                  <option value="English">English</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="History">History</option>
                  <option value="Commerce">Commerce</option>
                </select>
              </div>


            </div>
            <div className="form-group">
              <label style={{ marginBottom: '5px', fontSize: '19px' }} for="exampleInputPassword1"><b>Student Name:</b></label>
              <input
                type="text"
                className="form-control"
                name="studentName"
                placeholder="Avanthi Chathurya"
                value={this.state.studentName}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="form-group">
                <label style={{ marginBottom: '5px', fontSize: '19px' }} for="exampleInputPassword1">
                  <b>Student ID:</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="studentID"
                  placeholder="S001"
                  value={this.state.studentID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <label style={{ marginBottom: '5px', fontSize: '19px' }} for="exampleInputEmail1"><b>Marks:</b></label>
              <input
                type="text"
                class="form-control"
                name="marks"
                aria-describedby="emailHelp"
                placeholder="87"
                value={this.state.marks}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', fontSize: '19px' }} className="topic"><b>Grade Received:</b></label>
              <select
                className="form-control"
                style={{ marginBottom: '15px', maxWidth: '580px' }}
                name="gradeReceived"
                placeholder="Select Grade"
                value={this.state.gradeReceived}
                onChange={this.handleInputChange}
                required
              >
                <option value="Select">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>
            </div>

          </div>

          <div className="container" style={{ width: "170px" }}>
            <button
              type="submit"
              onClick={this.onSubmit}
              className="btn btn-primary"
              style={{
                width: "150px",
                fontSize: "large",
                backgroundColor: "MidnightBlue",
              }}
            >
              Update
            </button>
          </div>
        </form>
        <br></br>
      </div>
    );
  }
}
