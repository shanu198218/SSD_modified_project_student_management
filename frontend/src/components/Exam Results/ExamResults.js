import React, { Component } from "react";
import axios from "../../action/axios";
import swal from "sweetalert";
import jsPdf from 'jspdf';
import 'jspdf-autotable';

export default class ExamResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.retrieveResults();
  }

  retrieveResults() {
    axios.get("http://localhost:5000/results").then((res) => {
      console.log("hello");
      if (res.data.success) {
        this.setState({
          results: res.data.existingresults,
        });

        console.log(this.state.results);
      }
    });
  }

  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the details of this Exam Result!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5000/result/delete/${id}`).then((res) => {
          swal(
            "Delete Successfully!",
            "Exam result is removed",
            "success"
          );

          this.retrieveresults();
        });
      } else {
        swal("The Exam Result is not deleted!");
      }
    });
  };

  filterData(results, searchKey) {
    const result = results.filter(
      (results) =>
        results.subject.toLowerCase().includes(searchKey) ||
        results.studentName.toLowerCase().includes(searchKey) ||
        results.studentID.toLowerCase().includes(searchKey) ||
        results.gradeReceived.toLowerCase().includes(searchKey)
    );
    this.setState({ results: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/results").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingresults, searchKey);
      }
    });
  };

  //Report pdf generation

  jsPdfGenerator = () => {

    //New document in jspdf
    var doc = new jsPdf('l', 'pt', 'a3');

    doc.text(600, 20, 'Exam Results for Science - Grade 10', { align: 'center' },);
    doc.autoTable({ html: '#class-table' })

    doc.autoTable({
      columnStyles: { europe: { halign: 'center' } },
      margin: { top: 10 },
    })

    //save the pdf
    doc.save("Exam Results.pdf");
  }


  render() {
    return (
      <div className="container">
        <center>
          <h1
            className="text-center"
            style={{
              borderStyle: "solid",
              backgroundColor: "MidnightBlue",
              color: "white",
              width: "500px",
            }}
          >
            Exam Results - Science
          </h1>
        </center>

        <br></br>
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
        <br></br><br></br><br></br>

        <button
          className="btn btn-primary btn-lg active"
          style={{ backgroundColor: "#c99212" }}
        >
          <a
            href="result/add"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "large",
            }}
          >
            Add Result
          </a>
        </button>
        <button className="btn-primary" style={{ marginTop: '2px', marginLeft: '10px', padding: "9px", backgroundColor: '#000080', color: "white" }} onClick={this.jsPdfGenerator}><i className="fas fa-download"></i>&nbsp;Download Exam Results</button>

        <br></br><br></br><br></br>

        <table className="table table-striped" Id="class-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student Name</th>
              <th scope="col">Student ID</th>
              <th scope="col">Marks</th>
              <th scope="col">Grade</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.results.map((results, index) => (
              <tr key={index}>

                <td>{results.studentName}</td>
                <td>{results.studentID}</td>
                <td>{results.marks}</td>
                <td>{results.gradeReceived}</td>
                <a
                  className="btn btn-warning"
                  href={`result/update/${results._id}`}
                >
                  <i className="fas fa-edit"> </i>&nbsp; Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  href="#"
                  style={{ color: "black" }}
                  onClick={() => this.onDelete(results._id)}
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

      </div>

    );

  }
}