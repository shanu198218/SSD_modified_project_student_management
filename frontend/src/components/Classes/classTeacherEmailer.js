import React from 'react';
import emailjs from 'emailjs-com';
import swal from 'sweetalert';


const classTeacherEmailer = () => {


  function sendEmail(e) {

    e.preventDefault();

    emailjs.sendForm("service_ahg0a4i", "template_7tnwsfz",
      e.target, "wpE7lfDx7fRQ3Legd"
    ).then(res => {

      console.log(res);
      swal("Successful!", "Email Sent To The Teacher!", "success");



    }).catch(err => console.log(err));
  }

  return (

    <div>

      <div class="col-sm">
        <div className="container border"
          style={{
            marginTop: "50px",
            width: '50%',
            backgroundImage: `url('http://img.freepik.com/free-photo/glittery-star-confetti-colorful-abstract-pastel-watercolor-background_53876-98173.jpg?w=2000')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderStyle: "solid",
            borderWidth: "5px",
            boxShadow: "0 8px 350px 0 rgba(0, 0, 0, 0.5)",
            alignContent: "center"

          }}>

          <center>
            <h1 className="h3 mb-3 font-weight-normal" style={{ backgroundColor: '#add8e6', color: 'navy' }}><font face="Comic sans MS" size="8"><b>Teachers' Contact Form</b></font></h1><br />
          </center>
          <br />
          <center>

            <form className="row"
              style={{ margin: "25px 85px 75px 100px" }}
              onSubmit={sendEmail}>
              <label><h4><b>Name : </b></h4><br></br></label>
              <input type="text" name="name" className="form-control" />

              <label><h4><b>Teacher's Email :</b></h4><br></br></label><br></br>
              <input type="email" name="client_email" className="form-control"></input><br></br>

              <label><h4><b>Message : </b></h4><br></br></label>
              <textarea name="message" rows="4" className="form-control" /><br></br>
              <input type="submit"
                value="Send"
                className="form-control btn btn-danger"
                style={{ marginTop: "30px" }} />
            </form>

            <a className="btn btn-primary" style={{ marginTop: '15px', backgroundColor: '#000080' }} href={`/`}>
              <i className="fas fa-download"></i>&nbsp;View All Class Details
            </a>

          </center>

        </div>
      </div>
      <br /><br /><br /><br />
    </div>

  );
}
export default classTeacherEmailer;