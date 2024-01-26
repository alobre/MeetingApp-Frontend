import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { Typography, Button } from "@mui/material";
import "./style.css";
import MeetingTable from "components/MeetingTable";
import { getMeetings } from "components/AxiosInterceptor/AxiosInterceptor";

const HomeScreen = () => {
  const [meetings, setMeetings] = useState([]);
  const [groupedMeetings, setGroupedMeetings] = useState([]);
  const [authenticated, setAuthenticated] = useState(null);
  const [sortByType, setSortByType] = useState(false);
  const [sortByDate, setSortByDate] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") !== null;
    if (isAuthenticated) {
      setAuthenticated(true);
      const fetchMeetings = async () => {
        const meetings = await getMeetings();
        setMeetings(meetings);
      };
      fetchMeetings();
    } else {
      navigate("/Login");
    }
  }, []);

  const handleSortByType = () => {
    setSortByType(true);
    setSortByDate(false);

    // sort meetings by type
    const sortedMeetings = [...meetings].sort((a, b) => {
      const typeA = a.meeting_series_name || "";
      const typeB = b.meeting_series_name || "";
      return typeA.localeCompare(typeB);
    });

    setGroupedMeetings(sortedMeetings);
  };

  const handleSortByDate = () => {
    setSortByType(false);
    setSortByDate(true);

    // by datetime
    const sortedMeetings = [...meetings].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setMeetings(sortedMeetings);
  };

  if (!authenticated) {
    // Handle case where not authenticated
  } else {
    return (
      <div>
        <Card id="card-container">
          <Typography variant="h2" id="meeting-space-typography">
            Meeting Space
          </Typography>
          <Button variant="outlined" id="sort-type" onClick={handleSortByType}>
            sort by type
          </Button>
          <Button variant="outlined" id="sort-date" onClick={handleSortByDate}>
            sort by date
          </Button>
        </Card>
        {sortByType && <MeetingTable data={groupedMeetings} />}
        {sortByDate && <MeetingTable data={meetings} />}{" "}
      </div>
    );
  }
};

export default HomeScreen;
