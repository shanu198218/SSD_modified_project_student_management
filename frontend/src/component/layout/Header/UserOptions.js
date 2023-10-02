import React, { Fragment, useState } from "react";
import "./Header.css";
import Backdrop from "@material-ui/core/Backdrop";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PublishIcon from "@mui/icons-material/Publish";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../action/userAction";
import { useDispatch } from "react-redux";
import AddTaskIcon from "@mui/icons-material/AddTask";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmetReturnedIcon from "@mui/icons-material/AssignmentReturned";
import PaymentIcon from '@mui/icons-material/Payment';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ClassIcon from '@mui/icons-material/Class';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift(
      {
        icon: <PaymentIcon />,
        name: "Payment Details",
        func: paydetails,
      },
      {
        icon: <PaymentsIcon />,
        name: "Teachers Payment Add",
        func: TeachpayAdd,
      },
      {
        icon: <ReceiptIcon />,
        name: "Teacher SalDetails",
        func: TeacherSalDetails,
      },
      {
        icon: <PeopleIcon />,
        name: "Users Details",
        func: userdelails,
      },
      {
        icon: <TableChartOutlinedIcon />,
        name: "Exam Timetable",
        func: timetables,
      },
      {
        icon: <FormatListNumberedOutlinedIcon />,
        name: "Exam Results",
        func: results,
      },
      {
        icon: <LibraryBooksIcon />,
        name: "Add Class",
        func: addClass,
      },
      {
        icon: <ClassIcon />,
        name: "Class Details",
        func: classHome,
      },
      {
        icon: <NotificationAddIcon />,
        name: "Add Notice",
        func: addnotice,
      },
      {
        icon: <NotificationsIcon />,
        name: "All Notices",
        func: fetchNotice,
      },
    );
  }

  

 {
    options.unshift(
      {
        icon: <PaymentIcon />,
        name: "Student Payment",
        func: payadd,
      },
      {
        icon: <CheckBoxIcon />,
        name: "Student Payment Success",
        func: success,
      },
      {
        icon: <PaymentsIcon />,
        name: "Student Payment Update",
        func: stdpayupdate,
      },
      
      {
        icon: <TableChartOutlinedIcon />,
        name: "Exam Timetable",
        func: timetablesReport,
      },
      {
        icon: <FormatListNumberedOutlinedIcon />,
        name: "Exam Results",
        func: resultsReport,
      },
      {
        icon: <AssignmentReturnedIcon />,
        name: "Class Details",
        func: classReport,
      },
      {
        icon: <MarkEmailUnreadIcon />,
        name: "Notice Report",
        func: noticeReport,
      },
      
      
    );
  }

  function payadd() {
    history.push("/payadd");
  }

  function success() {
    history.push("/success");
  }

  function stdpayupdate() {
    history.push("/StdUpdate/:id");
  }

  function paydetails() {
    history.push("/paydetails");
  }


  function TeachpayAdd() {
    history.push("/TeachpayAdd");
  }
  function TeacherSalDetails() {
    history.push("/TeacherSalDetails");
  }
  function userdelails() {
    history.push("/admin/users");
  }

  function timetables() {
    history.push("/timetables");
  }
  function results() {
    history.push("/results");
  }

  function account() {
    history.push("/account");
  }

  function timetablesReport() {
    history.push("/timetablesReport");
  }
  function resultsReport() {
    history.push("/resultsReport");
  }
  function classReport() {
    history.push("/classReport");
  }
  function noticeReport() {
    history.push("/noticeReport");
  }
  function addClass() {
    history.push("/addClass");
  }
  function classHome() {
    history.push("/classHome");
  }
  function addnotice() {
    history.push("/addnotice");
  }
  function fetchNotice() {
    history.push("/fetchNotice");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={<AccountCircleIcon className="speedDialIcon" />}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
