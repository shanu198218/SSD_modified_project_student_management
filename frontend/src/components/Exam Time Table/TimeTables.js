import React, { Component } from "react";
import axios from "../../action/axios";
//import axios from "../../action/axios";
import swal from "sweetalert";
import jsPdf from 'jspdf';
import 'jspdf-autotable';

export default class TimeTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timetables: [],
    };
  }

  componentDidMount() {
    this.retrieveTimeTables();
  }

  logout = () => {
    this.props.history.push("/");

  }


  retrieveTimeTables() {
    axios.get("http://localhost:5000/timetables").then((res) => {
      console.log("hello");
      if (res.data.success) {
        this.setState({
          timetables: res.data.existingtimetables,
        });

        console.log(this.state.timetables);
      }
    });
  }

  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the details of this Time Table Record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5000/timetables/delete/${id}`).then((res) => {
          swal(
            "Delete Successfully!",
            "Time Table Record details are removed",
            "success"
          );

          this.retrievetimetables();
        });
      } else {
        swal("The Time Table Record is not deleted!");
      }
    });
  };

  filterData(timetables, searchKey) {
    const result = timetables.filter(
      (timetables) =>
        timetables.subject.toLowerCase().includes(searchKey) ||
        timetables.date.toLowerCase().includes(searchKey) ||
        timetables.startTime.toLowerCase().includes(searchKey) ||
        timetables.endTime.toLowerCase().includes(searchKey) ||
        timetables.examHall.toLowerCase().includes(searchKey)
    );
    this.setState({ timetables: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/timetables").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingtimetables, searchKey);
      }
    });
  };

  //Report pdf generation

  jsPdfGenerator = () => {

    //New document in jspdf
    var doc = new jsPdf('l', 'pt', 'a3');

    doc.text(600, 20, 'Exam Time Table', { align: 'center' },);
    doc.autoTable({ html: '#class-table' })

    doc.autoTable({
      columnStyles: { europe: { halign: 'center' } },
      margin: { top: 10 },
    })

    //save the pdf
    doc.save("Exam Time Table.pdf");
  }




  render() {
    return (
      <div className="container">
       
        <h1
          className="text-center"
          style={{
            borderStyle: "solid",
            backgroundColor: "MidnightBlue",
            color: "orange",
          }}
        >
          Exam Time Table
        </h1>

        <div className="col-md-5 mb-17">
          <form class="form-inline">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </form>
        </div>

        <br></br>
        <table className="table table-striped" Id="class-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Date</th>

              <th scope="col">Start Time</th>

              <th scope="col">End Time</th>

              <th scope="col">Exam Hall</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.timetables.map((timetables, index) => (
              <tr key={index}>

                <td>{timetables.subject}</td>
                <td>{timetables.date}</td>
                <td>{timetables.startTime}</td>
                <td>{timetables.endTime}</td>
                <td>{timetables.examHall}</td>
                <a
                  className="btn btn-warning"
                  href={`timetables/update/${timetables._id}`}
                >
                  <i className="fas fa-edit"> </i>&nbsp; Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  href="#"
                  style={{ color: "black" }}
                  onClick={() => this.onDelete(timetables._id)}
                >
                  <i
                    className="far fa-trash-alt"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "medium",
                    }}
                  >
                    {" "}
                  </i>{" "}
                  &nbsp; Delete
                </a>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-primary btn-lg active"
          style={{ backgroundColor: "#c99212" }}
        >
          <a
            href="timetables/add"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "large",
            }}
          >
            Add Time Table Record
          </a>
        </button>
        <button className="btn-primary" style={{ marginTop: '15px', marginLeft: '10px', padding: "9px", backgroundColor: '#000080' }} onClick={this.jsPdfGenerator}><i className="fas fa-download"></i>&nbsp;Download Exam Time Table</button>
      </div>

    );

  }
}