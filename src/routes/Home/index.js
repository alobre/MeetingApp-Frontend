import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./style.css";
import MeetingTable from "components/MeetingTable";

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
      meetingID: 1231,
      date: "2023-07-01",
      startTime: "12:15",
      endTime: "14:20",
      title: "Meeting Board",
      meetingPlace: "FHTW F1.02",
      actionPoints: [
        {
          title: "Opening",
          subPoints: [{ title: "Quick introductions" }],
          comments: [],
        },
        {
          title: "Courses schedule",
          subPoints: [
            { title: "Appropriate time for courses" },
            { title: "Changing the 8AM time slots" },
          ],
          comments: [],
        },
        {
          title: "Moodle quiz system bugs",
          subPoints: [{ title: "Reported issues" }, { title: "Plans for updates" }],
          comments: [],
        },
      ],
    },
    {
      meetingID: 1523,
      date: "2023-07-01",
      startTime: "12:15",
      endTime: "14:20",
      title: "Project Stardust Team Meeting",
      meetingPlace: "FHTW F1.02",
      actionPoints: [
        {
          title: "Opening",
          subPoints: [{ title: "Quick introductions" }],
          comments: [],
        },
        {
          title: "Courses schedule",
          subPoints: [
            { title: "Appropriate time for courses" },
            { title: "Changing the 8AM time slots" },
          ],
          comments: [],
        },
        {
          title: "Moodle quiz system bugs",
          subPoints: [{ title: "Reported issues" }, { title: "Plans for updates" }],
          comments: [],
        },
      ],
    },
    {
      meetingID: 1233,
      date: "2023-07-02",
      startTime: "12:15",
      endTime: "14:20",
      title: "Board Meeting II",
      meetingPlace: "FHTW F1.02",
      actionPoints: [
        {
          title: "Opening",
          subPoints: [{ title: "Quick introductions" }],
          comments: [],
        },
        {
          title: "Courses schedule",
          subPoints: [
            { title: "Appropriate time for courses" },
            { title: "Changing the 8AM time slots" },
          ],
          comments: [],
        },
        {
          title: "Moodle quiz system bugs",
          subPoints: [{ title: "Reported issues" }, { title: "Plans for updates" }],
          comments: [],
        },
      ],
    },
    {
      meetingID: 1123,
      date: "2023-07-04",
      startTime: "12:15",
      endTime: "14:20",
      title: "Meeting Board IV",
      meetingPlace: "FHTW F1.02",
      actionPoints: [
        {
          title: "Opening",
          subPoints: [{ title: "Quick introductions" }],
          comments: [],
        },
        {
          title: "Courses schedule",
          subPoints: [
            { title: "Appropriate time for courses" },
            { title: "Changing the 8AM time slots" },
          ],
          comments: [],
        },
        {
          title: "Moodle quiz system bugs",
          subPoints: [{ title: "Reported issues" }, { title: "Plans for updates" }],
          comments: [],
        },
      ],
    },
    {
      meetingID: 1453,
      date: "2023-07-01",
      startTime: "12:15",
      endTime: "14:20",
      title: "Semester Opening",
      meetingPlace: "FHTW F1.02",
      actionPoints: [
        {
          title: "Opening",
          subPoints: [{ title: "Quick introductions" }],
          comments: [],
        },
        {
          title: "Courses schedule",
          subPoints: [
            { title: "Appropriate time for courses" },
            { title: "Changing the 8AM time slots" },
          ],
          comments: [],
        },
        {
          title: "Moodle quiz system bugs",
          subPoints: [{ title: "Reported issues" }, { title: "Plans for updates" }],
          comments: [],
        },
      ],
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
