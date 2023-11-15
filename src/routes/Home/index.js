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