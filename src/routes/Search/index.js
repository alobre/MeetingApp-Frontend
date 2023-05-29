import React, { useState } from "react";
import style from "./style.css";
import MeetingTable from "components/MeetingTable";
import { TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import meetings from 'routes/Home'; // Import the meetings array


function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to search meetings by title
  const SearchScreen = () => {
    const results = meetings.filter(meeting =>
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <TextField
        label="Search Meetings"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={SearchScreen}>
        Search
      </Button>

      <List>
        {searchResults.map(meeting => (
          <ListItem key={meeting.id}>
            <ListItemText primary={meeting.title} secondary={meeting.description} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}


export default SearchScreen;
