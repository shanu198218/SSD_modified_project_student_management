import React, { Component } from "react";
import axios from "../../action/axios";
import swal from "sweetalert";

export default class EditTimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: "",
      subject: "",
      date: "",
      startTime: "",
      endTime: "",
      examHall: "",
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
      date,
      startTime,
      endTime,
      examHall,
    } = this.state;

    const data = {
      grade: grade,
      subject: subject,
      date: date,
      startTime: startTime,
      endTime: endTime,
      examHall: examHall,
    };

    console.log(data);

    if (
      grade === "" ||
      subject === "" ||
      date === "" ||
      startTime === "" ||
      endTime === "" ||
      examHall === ""
    ) {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );
    } else {
      swal({
        title: "Are you sure?",
        text: `Grade: ${this.state.grade} | Subject: ${this.state.subject} | Date: ${this.state.date} 
        Start Time: ${this.state.startTime} | End Time: ${this.state.endTime} | Exam Hall: ${this.state.examHall}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.put(`http://localhost:5000/timetables/update/${id}`, data).then((res) => {
            if (res.data.success) {
              this.setState({
                grade: "",
                subject: "",
                date: "",
                startTime: "",
                endTime: "",
                examHall: "",
              });
            }
          });
          swal("Exam Time Table Record Updated Successfully!", {
            icon: "success",
          });
        } else {
          swal("Time Table Updation is not completed!");
        }
      });
    }
  };


  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/timetables/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          grade: res.data.timetable.grade,
          subject: res.data.timetable.subject,
          date: res.data.timetable.date,
          startTime: res.data.timetable.startTime,
          endTime: res.data.timetable.endTime,
          examHall: res.data.timetable.examHall,
        });
        console.log(this.state.timetables);
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
            color: "orange",
          }}
        >
          Update Exam Time Table
        </h1>
        <br></br>
        <form>
          <div className="form-group">
            <div className="form-group">
              <label for="exampleInputPassword1">
                Grade:
              </label>
              <input
                type="text"
                className="form-control"
                name="grade"
                placeholder="10"
                value={this.state.grade}
                onChange={this.handleInputChange}
                required
              />

              <label for="exampleInputEmail1">Subject:</label>
              <input
                type="text"
                class="form-control"
                name="subject"
                aria-describedby="emailHelp"
                placeholder="Science"
                value={this.state.subject}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Date:</label>
              <input
                type="text"
                className="form-control"
                name="date"
                placeholder="9/9/2022"
                value={this.state.date}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="form-group">
                <label for="exampleInputPassword1">
                  Start Time:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="startTime"
                  placeholder="9.30 AM"
                  value={this.state.startTime}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <label for="exampleInputEmail1">End Time:</label>
              <input
                type="text"
                class="form-control"
                name="endTime"
                aria-describedby="emailHelp"
                placeholder="11.30 AM"
                value={this.state.endTime}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Exam Hall:</label>
              <input
                type="text"
                className="form-control"
                name="examHall"
                placeholder="A"
                value={this.state.examHall}
                onChange={this.handleInputChange}
                required
              />
            </div>

          </div>
          <br></br>
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
