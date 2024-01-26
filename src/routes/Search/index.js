import React, { useEffect, useState } from "react";
// import style from "./style.css";
import MeetingTable from "components/MeetingTable";
// import { TextField, Button, List, ListItem, ListItemText, FormControlLabel } from '@material-ui/core';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import meetings from "routes/Home"; // Import the meetings array
import { useLocation } from "react-router-dom";
import "./style.css";

function SearchScreen() {
  const state = useLocation();
  const meetings = state.state.meetings;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [searchMeetingSerie, setSearchMeetingSerie] = useState(false);

  // Function to search meetings by title
  const searchMeetings = () => {
    const results = meetings.filter((meeting) => {
      const matchTitle = meeting.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchMeetingSerie =
        searchMeetingSerie && meeting.meetingSerie.length > 0;
      return matchTitle || matchMeetingSerie;
    });
    setSearchResults(results);
  };

  useEffect(() => {
    console.log(state.state.meetings);
  }, [state]);
  return (
    <div id="StylingSearchInTheMiddle">
      <TextField
        label="Search Meetings"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={searchMeetingSerie}
            onChange={(event) => setSearchMeetingSerie(event.target.checked)}
            color="primary"
          />
        }
        label="Search for Meeting Series"
      />
      <Button variant="contained" color="primary" onClick={searchMeetings}>
        Search
      </Button>

      <div id="ButtonThePrettier">
        <List>
          <MeetingTable data={searchResults} />
        </List>
      </div>
    </div>
  );
}

export default SearchScreen;
