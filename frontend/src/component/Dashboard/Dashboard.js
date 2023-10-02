import React, { Component } from "react";
import swal from "sweetalert";
import jsPdf from "jspdf";
import "jspdf-autotable";
import "./Dashboard.css";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="body">
        <div className="DashboardContainer">
          <a href="/admin/users">
            <button className="btn-primary">Users</button>
          </a>
          <a href="/admin/researchTopicHome">
            <button className="btn-primary">Research Topics</button>
          </a>
          <a href="/admin/studentGrps">
            <button className="btn-primary">Research Groups</button>
          </a>
        </div>
      </div>
    );
  }
}
