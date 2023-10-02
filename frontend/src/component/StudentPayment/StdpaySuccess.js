import React, { Component } from 'react';
import BG from '../../images/success.gif';

class StdpaySuccess extends Component {
    render() {
        return (
            <center>
        <br />
        <br />
        <div className="container hire">
        <br />
        <marquee direction="left"><p class="display-3 " style={{ color: "#000080", fontStyle: "italic" }}>Your Payment Details are Successfully Registered!!</p></marquee>
        </div>
       
        
        <img className="sucess-img" src={BG} alt='bg img' />
       
      </center>
        );
    }
}

export default StdpaySuccess;