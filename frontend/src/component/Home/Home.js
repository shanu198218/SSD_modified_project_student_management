import React, { Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <h1>Your Path To Greatness STARTS HERE</h1>

        <a href="/About">
          <button>
            About <FaInfoCircle />
          </button>
        </a>
      </div>

      <h2 className="homeHeading1">"Your Path To Greatness</h2>
      <h2 className="homeHeading2">STARTS HERE"</h2>

      <p className="container">
      </p>
    </Fragment>
  );
};

export default Home;
