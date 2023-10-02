import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <ReactNavbar
      burgerColor="#ef991e"
      burgerColorHover="#BF760C"
      logo={logo}
      logoWidth="20vmax"
      navColor1="rgba(0,0,0,0.9)"
      logoHoverSize="10px"
      logoHoverColor="#BF760C"
      link1Text="Home"
      link2Text="Class"
      link3Text="Timetable"
      link4Text="Payment"
      link5Text="Timetable"
      link1Url="/"
      link2Url="/classHome"
      link3Url="/timetables"
      link4Url="/paydetails"
      link5Url="/about"
      link1Size="1.2vmax"
      link1Color="white"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      link1ColorHover="#BF760C"
      link2ColorHover="#BF760C"
      link3ColorHover="#BF760C"
      link4ColorHover="#BF760C"
      link2Margin="2vmax"
      link3Margin="0"
      link4Margin="2vmax"
      profileIcon={true}
      profileIconUrl="/login"
      ProfileIconElement={FaUserAlt}
      searchIcon={true}
      SearchIconElement={FaSearch}
      profileIconColor="white"
      searchIconColor="white"
      profileIconColorHover="#BF760C"
      searchIconColorHover="#BF760C"
      searchIconMargin="1vmax"
      profileIconMargin="1vmax"
    />
  );
};

export default Header;
