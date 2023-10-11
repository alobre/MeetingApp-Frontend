import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { Typography, Button } from "@mui/material";
import "./style.css";
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
      date: "2023-07-05",
      startTime: "12:15",
      endTime: "14:20",
      title: "Meeting Board",
      meetingAddress: "Hoechstadtplatz 5",
      meetingBuilding: "A",
      meetingRoom: "4.04",
      meetingPlace: "FHTW F1.02",
      meetingType: "Project Stardust",
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
          subPoints: [
            { title: "Reported issues" },
            { title: "Plans for updates" },
          ],
          comments: [],
        },
      ],
    },
    {
      meetingID: 1523,
      date: "2023-07-03",
      startTime: "12:15",
      endTime: "14:20",
      title: "Project Stardust Team Meeting",
      meetingAddress: "Hoechstadtplatz 5",
      meetingBuilding: "A",
      meetingRoom: "4.04",
      meetingPlace: "FHTW F1.02",
      meetingType: "IT Department",
      actionPoints: [
        {
          title: "Beginning",
          subPoints: [{ title: "Say something" }],
          comments: [],
        },
        {
          title: "Morning classes",
          subPoints: [
            { title: "Appropriate time for courses" },
            { title: "Changing the 8AM time slots" },
          ],
          comments: [],
        },
        {
          title: "Ferien",
          subPoints: [
            { title: "Reported issues" },
            { title: "Plans for updates" },
          ],
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
      meetingAddress: "Hoechstadtplatz 5",
      meetingBuilding: "A",
      meetingRoom: "4.04",
      meetingPlace: "FHTW F1.02",
      meetingType: "IT Department",
      actionPoints: [
        {
          title: "Introductions",
          subPoints: [{ title: "Quick introductions" }],
          comments: [],
        },
        {
          title: "Grading",
          subPoints: [
            { title: "Appropriate time for courses" },
            { title: "Changing the 8AM time slots" },
          ],
          comments: [],
        },
        {
          title: "Salaries",
          subPoints: [
            { title: "Reported issues" },
            { title: "Plans for updates" },
          ],
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
      meetingAddress: "Hoechstadtplatz 5",
      meetingBuilding: "A",
      meetingRoom: "4.04",
      meetingPlace: "FHTW F1.02",
      meetingType: "Board",
      actionPoints: [
        {
          title: "Opening",
          subPoints: [{ title: "Quick introductions" }],
          comments: [],
        },
        {
          title: "External contractors",
          subPoints: [
            { title: "Appropriate time for courses" },
            { title: "Changing the 8AM time slots" },
          ],
          comments: [],
        },
        {
          title: "CIS bugs",
          subPoints: [
            { title: "Reported issues" },
            { title: "Plans for updates" },
          ],
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
      meetingAddress: "Hoechstadtplatz 5",
      meetingBuilding: "A",
      meetingRoom: "4.04",
      meetingPlace: "FHTW F1.02",
      meetingType: "Project Stardust",
      actionPoints: [
        {
          title: "Meeting beginning",
          subPoints: [{ title: "Quick introductions" }],
          comments: [],
        },
        {
          title: "Student questions",
          subPoints: [{ title: "Appropriate time for courses" }],
          comments: [],
        },
        {
          title: "Answers",
          subPoints: [
            { title: "Reported issues" },
            { title: "Plans for updates" },
          ],
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
        <Card id="card-container">
          <Typography variant="h2" id="meeting-space-typography">
            Meeting Space
          </Typography>
          <Button variant="outlined" id="sort-type">
            sort by type
          </Button>
          <Button variant="outlined" id="sort-date">
            sort by date
          </Button>
        </Card>
        <MeetingTable data={tableData} />
      </div>
    );
  }
};
export default HomeScreen;
