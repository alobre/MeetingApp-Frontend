import React, { useState } from "react";
import Card from "@mui/material/Card";
import { useLocation } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "./style.css";

const WriteProtocol = () => {
  const location = useLocation();
  console.log("location.state:", location.state);
  const agenda = location.state?.agenda;
  //   console.log("agenda:", agenda);

  const [meetingNotes, setMeetingNotes] = useState(
    Array(agenda.actionPoints.length).fill("")
  );

  const handleMeetingNotesChange = (event, index) => {
    const updatedMeetingNotes = [...meetingNotes];
    updatedMeetingNotes[index] = event.target.value;
    setMeetingNotes(updatedMeetingNotes);
  };

  if (!agenda) {
    return <div>No agenda found.</div>;
  }

  const handleSaveProtocol = () => {
    const protocol = {
      agendaPoints: agenda.actionPoints.map((actionPoint, index) => ({
        title: actionPoint.title,
        subPoints: actionPoint.subPoints.map((subPoint) => subPoint.title),
        comments: actionPoint.comments.map((comment) => comment.title),
        meetingNotes: meetingNotes[index], // Include meeting notes for each agenda item
      })),
    };

    // Do something with the protocol object, e.g., send it to an API

    console.log("Protocol:", protocol);
  };

  return (
    <div>
      <Card className="card-container">
        <Typography variant="h2">Meeting Notes</Typography>
        <Button
          variant="outlined"
          className="protocol"
          onClick={handleSaveProtocol}
        >
          Finalize protocol
        </Button>
        <TableContainer className="table-container-details">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Meeting Time:</Typography>
                  <Typography variant="h6">{agenda.meetingTime}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Meeting Date:</Typography>
                  <Typography variant="h6">{agenda.meetingDate}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Meeting Place:</Typography>
                  <Typography variant="h6">{agenda.meetingPlace}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" className="agenda-items-header">
          Agenda Items
        </Typography>
        <TableContainer className="table-container-agenda">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" className="custom-h6">
                    Item No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" className="custom-h6">
                    Action Points
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" className="custom-h6">
                    Sub-Points
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" className="custom-h6">
                    Comments
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" className="custom-h6">
                    Meeting Notes
                  </Typography>
                </TableCell>
              </TableRow>
              {agenda.actionPoints.map((actionPoint, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1">{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" className="agenda-item-title">
                      {actionPoint.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <List>
                      {actionPoint.subPoints.map((subPoint, subIndex) => (
                        <ListItem key={subIndex}>{subPoint.title}</ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>
                    <List>
                      {actionPoint.comments.map((comment, commentIndex) => (
                        <ListItem key={commentIndex}>{comment.title}</ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={meetingNotes[index] || ""}
                      onChange={(event) =>
                        handleMeetingNotesChange(event, index)
                      }
                      label="Meeting Notes"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" className="members">
          Members
        </Typography>
        <List>
          {agenda.members.map((member, index) => (
            <ListItem key={index}>{member.name}</ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default WriteProtocol;
