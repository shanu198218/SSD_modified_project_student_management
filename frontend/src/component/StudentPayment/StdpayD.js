import React, { Component } from 'react';
import axios from '../../action/axios';
//import '../style/CardPay.css'


class StdpayD extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {}
        };

    }

    componentDidMount() {

        const id = this.props.match.params.id;

        //post/${id}/
        axios.get(`http://localhost:8000/stdpay/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    post: res.data.post
                });

                console.log(this.state.post);
            }
        });

    }



    render() {

        const { sfirstName, slastName, studentId, gradeLevel, mobiNum, email, parentName, payMethod, parentMnu } = this.state.post;

        return (
            <div className="container border"

                style={{
                    marginTop: "50px",
                    width: '50%',
                    backgroundImage: `url('http://image.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}>
                <div style={{ marginTop: '20px', fontSize: 'medium' }}>

                    <br></br>
                    <center>
                        <h3>Student Payment Details</h3>
                    </center>
                    <br></br>
                    <h4 ><b>{sfirstName}</b></h4>
                    <hr />


                    <d1 className="row" style={{ marginTop: '10px' }}>
                        <dt className="col-sm-3">Student Last Name</dt>
                        <dd className="col-sm-9">{slastName}</dd>

                        <dt className="col-sm-3">Student Registration Number</dt>
                        <dd className="col-sm-9">{studentId}</dd>

                        <dt className="col-sm-3">Grade Level :</dt>
                        <dd className="col-sm-9">{gradeLevel}</dd>

                        <dt className="col-sm-3">Mobile Number  :</dt>
                        <dd className="col-sm-9">{mobiNum}</dd>

                        <dt className="col-sm-3">Email :</dt>
                        <dd className="col-sm-9">{email}</dd>


                        <dt className="col-sm-3">Parent Name  :</dt>
                        <dd className="col-sm-9">{parentName}</dd>

                        <dt className="col-sm-3">Payment Method  :</dt>
                        <dd className="col-sm-9">{payMethod}</dd>

                        <dt className="col-sm-3">Parent Contact Number :</dt>
                        <dd className="col-sm-9">{parentMnu}</dd>




                    </d1>

                    <div className="form-group">
                        <br />


                    </div>
                </div>


            </div>
        );
    }


}

export default StdpayD;