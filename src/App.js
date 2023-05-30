import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "routes/Home";
import Login from "routes/Login";
import Notification from "routes/Notification";
import CreateMeeting from "routes/CreateMeeting";
import EditAgenda from "routes/EditAgenda";
import Search from "routes/Search";
import ReactDOM from "react-dom";
import AppBar from "components/AppBar";
import ViewAgenda from "routes/ViewAgenda";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WriteProtocol from "routes/WriteProtocol";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>,
//   },
//   {
//     path: "/Login",
//     element: <Login/>,
//   },
// ]);

function App() {
  const [tableData, setTableData] = useState([
    {
      meetingID: 1231,
      date: "2023-07-05",
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
      meetingPlace: "FHTW F1.02",
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
      meetingPlace: "FHTW F1.02",
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
      meetingPlace: "FHTW F1.02",
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
      meetingPlace: "FHTW F1.02",
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
  return (
    <div>
      <Router>
        <AppBar meetings={tableData}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateMeeting" element={<CreateMeeting />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/EditAgenda" element={<EditAgenda />} />
          <Route path="/ViewAgenda" element={<ViewAgenda />} />
          <Route path="/WriteProtocol" element={<WriteProtocol />} />
        </Routes>
        {/* <RouterProvider router={router} /> */}
      </Router>
    </div>
  );
}

export default App;
