import React, { Component } from 'react';
import emailjs from 'emailjs-com'

const maill = () => {



    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_yqmzwdu",
            "template_kyjtn22",
            e.target,
            "user_IszLcJw7eieYNoRBcusnB"
        ).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }



    {
        return (

            <div className="container border"

                style={{

                    marginTop: "50px",
                    width: '50%',
                    backgroundImage: `url('http://image.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}>
                <br></br>
                <center>
                    <h1 style={{ marginTop: "20px", fontSize: "50px" }}>Student Payment confirmation Mail</h1>
                </center>
                <form className="row" style={{ margin: "25px 85px 75px 100px" }}
                    onSubmit={sendEmail}>
                    <lable>Student name</lable>
                    <input type="text" name="name" className="form-control" style={{ fontSize: 'medium' }} ></input>

                    <lable>Student email</lable>
                    <input type="email" name="user_email" className="form-control" style={{ fontSize: 'medium' }} />

                    <lable>Message</lable>
                    <textarea type="message" name="emailms" rows="4" className="form-control" style={{ fontSize: 'medium' }} />

                    &nbsp;
                    <input type="submit" value="Send" className='btn btn-primary' style={{

                        height: '12%'
                    }} />


                </form>
            </div>
        );
    }
}

export default maill;