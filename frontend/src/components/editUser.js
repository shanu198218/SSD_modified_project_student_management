import React, { Component } from "react";
import axios from "../action/axios";
import swal from "sweetalert";

export default class editUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role: "",
      idNumber: "",
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

    const { name, email, role, idNumber, username, address, contactno } = this.state;

    const data = {
      name: name,
      email: email,
      role: role,
      idNumber: idNumber,
      username: username,
      address: address,
      contactno: contactno,
    };

    console.log(data);

    //Validation

    if (
      name.length == "" ||
      email.length == "" ||
      role.length == "" ||
      idNumber.length == "" ||
      username.length == "" ||
      address.length == "" ||
      contactno.length == ""
    ) {
      swal(
        "Fields cannot be empty !",
        "Plese fill all the information!",
        "error"
      );
    } else if (idNumber.length > 20) {
      swal(
        "Invalid Id Number !",
        "Do not enter more than 20 letters !",
        "error"
      );
    } else {
      axios.put(`/api/v1/postuser/update/${id} `, data).then((res) => {
        if (res.data.success) {
          swal("Successful!", "User Details Updated", "success");
          this.setState({
            name: "",
            email: "",
            role: "",
            idNumber: "",
            username: "",
            address: "",
            contactno: "",
          });
        }
      });
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/api/v1/postUser/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          name: res.data.post.name,
          email: res.data.post.email,
          role: res.data.post.role,
          idNumber: res.data.post.idNumber,
          username: res.data.post.username,
          address: res.data.post.address,
          contactno: res.data.post.contactno,
        });
      }
    });
  }

  render() {
    return (
      <div
        className="container border"
        style={{
          marginTop: "50px",

          width: "50%",

          backgroundImage: `url('http://previews.123rf.com/images/pospelowa/pospelowa1703/pospelowa170300023/73692302-dry-flowers-on-a-white-wooden-background-wallpaper.jpg')`,

          backgroundPosition: "center",

          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="cardU" style={{ marginTop: "40px" }}>
            <div className="card-body">
              <div className="col-md-8 mt-4 mx-auto">
                <center>
                  <h1
                    className="h3 mb-3 font-weight-normal"
                    style={{
                      backgroundColor: "#d4eff9",
                      marginTop: "40px",
                      color: "navy",
                    }}
                  >
                    <font face="Comic sans MS" size="6">
                      <b>Update User Details</b>
                    </font>
                  </h1>
                  <br />
                </center>
                <br />
                <form className="needs-validation" noValidate>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <b>Full Name</b>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter Your Name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <b>Email</b>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Enter Email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>



                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <b>ID Number:</b>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      className="form-control"
                      name="idNumber"
                      placeholder="Enter Your ID Number"
                      value={this.state.idNumber}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <b>Username:</b>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <b>Address:</b>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <b>Contact Number:</b>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      className="form-control"
                      name="contactno"
                      placeholder="Contact Number"
                      value={this.state.contactno}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <b>Role:</b>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      className="form-control"
                      name="role"
                      placeholder="Role"
                      value={this.state.role}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    type="submit"
                    style={{ marginTop: "15px" }}
                    onClick={this.onSubmit}
                  >
                    <i className="far fa-check-square"></i>
                    &nbsp; Update
                  </button>
                </form>
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
