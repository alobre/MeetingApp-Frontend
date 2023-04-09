import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./style.css";
import MeetingTable from "../../components/MeetingTable";

const HomeScreen = () => {
  // const [authenticated, setauthenticated] = useState(null);
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("authenticated");
  //   if (loggedInUser) {
  //     setauthenticated(loggedInUser);
  //   }
  // }, []);

  const [tableData, setTableData] = useState([
    {
      date: "22.01.2023",
      title: "Meeting Board",
    },
    {
      date: "23.01.2023",
      title: "Project Stardust Team Meeting",
    },
    {
      date: "24.01.2023",
      title: "Board Meeting II",
    },
    {
      date: "25.01.2023",
      title: "Meeting Board IV",
    },
    {
      date: "26.01.2023",
      title: "Semester Opening",
    },
  ]);

  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);

  // on the "myMeetingScreen" first check if the user is logged in, if yes, then display the table, if not, redirect to Login page
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") !== null;
    if (isAuthenticated) {
      setauthenticated(true);
    } else {
      navigate("/Login");
    }
  }, []);

  if (!authenticated) {
  } else {
    return (
      <div>
        <MeetingTable data={tableData} />
      </div>
    );
  }
};
export default HomeScreen;
