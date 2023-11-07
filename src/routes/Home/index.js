import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { Typography, Button } from "@mui/material";
import "./style.css";
import MeetingTable from "components/MeetingTable";
import { getMeetings } from "components/AxiosInterceptor/AxiosInterceptor";

const HomeScreen = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(null);

    // const getMeetings = async () => {
    //   try {
    //     const response = await fetch('http://localhost:4000/getMeetings', {
    //       method: 'GET',
    //       mode: 'cors'
    //     })
    //     const jsonData = await response.json();
    //     console.log(jsonData);
    //     setMeetings(jsonData);
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // };

/*
  const getMeetings = async () => {
    try {
      const response = await fetch("http://localhost:4000/getMeetings");
      const jsonData = await response.json();
      console.log(jsonData);
      setMeetings(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
*/
  // useEffect(() => {
  //   getMeetings();
  // }, []);

  // on the "myMeetingScreen" first check if the user is logged in, if yes, then display the table, if not, redirect to Login page
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") !== null;
    if (isAuthenticated) {
      setAuthenticated(true);
      const fetchMeetings = async () =>{
        const meetings = await getMeetings();
        setMeetings(meetings);
      }
      fetchMeetings()
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
        <MeetingTable data={meetings} />
      </div>
    );
  }
};
export default HomeScreen;