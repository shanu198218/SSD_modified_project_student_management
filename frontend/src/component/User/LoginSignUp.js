import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

//google firebase authentication import
import {auth,provider} from "./config";
import { signInWithPopup } from "firebase/auth";
import SalaryReport from "../TeacherSalay/TeacherSalDetails"

//icon imports
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import FaceIcon from "@mui/icons-material/Face";
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import BG from '../../images/google.png';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../action/userAction";

const LoginSignUp = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [contactno, setContactno] = useState("");
  const [dob, setDob] = useState("");

  const [showLoginSignUpContainer, setShowLoginSignUpContainer] = useState(true);


  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, idNumber, username, address, contactno, dob));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push("/paydetails");
    }
  }, [dispatch, error, alert, history, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const [value , setValue] = useState("")
  const handleClick = () => {
    signInWithPopup(auth,provider).then((data) =>{
      setValue(data.user.email)
      localStorage.setItem("email",data.user.email);
      history.push("/paydetails"); 
    })
  }

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
  
          <div>
            
          </div>
          <img className="S.png" src={BG} alt='bg img' style={{  marginTop: "48px", height:"40px", marginLeft:"120px" }} />
              <button onClick={handleClick} style={{ marginLeft:'15px', marginTop : '50px', textAlign: 'center', textDecoration: 'none', fontSize: 'medium', background: '#000080' , color:"whitesmoke"  }} class="btn btn-info" >Google</button>
           
  
           
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forget Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
             
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName" style={{ marginTop:"-68px"}}>
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="signUpEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="signUpPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
  
              <div className="signUpId">
                <CoPresentIcon />
                <input
                  type="text"
                  placeholder="ID Number"
                  required
                  name="idNumber"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
  
              <div className="signUpUsername">
                <BadgeIcon />
                <input
                  type="text"
                  placeholder="Username"
                  required
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
  
              <div className="signUpAddress">
                <HomeIcon />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="signUpContactno">
                <PhoneAndroidIcon />
                <input
                  type="text"
                  placeholder="Contact Number"
                  required
                  name="contactno"
                  value={contactno}
                  onChange={(e) => setContactno(e.target.value)}
                />
              </div>
  
              <div className="signUpDob">
                <CalendarTodayIcon />
                <input
                  type="date"
                  required
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <br />
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      )}
      {value && <SalaryReport />}
    </Fragment>
  );
  
};

export default LoginSignUp;
