import React, { Component } from 'react';
import axios from '../../action/axios';
import jsPdf from 'jspdf';
import 'jspdf-autotable';

export default class TimeTableReport extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timetables: []
    };
  }

  componentDidMount() {
    this.retrieveTimeTables();
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
            Exam Time Table
          </h1>
        </center>

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


              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn-primary" style={{ marginTop: '15px', marginLeft: '10px', padding: "9px", backgroundColor: '#000080' }} onClick={this.jsPdfGenerator}><i className="fas fa-download"></i>&nbsp;Download Exam Time Table</button>
      </div>

    );

  }
}