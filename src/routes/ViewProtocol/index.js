import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  List,
  ListItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { getProtocol } from "components/AxiosInterceptor/AxiosInterceptor";
import Card from "@mui/material/Card";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MemberList from "components/MemberList";

import "./style.css";

const ViewProtocol = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location.state:", location.state);
  //const protocol = location.state?.protocol;
  //console.log("protocol:", protocol);
  const [isModalOpen, setModalOpen] = useState(false);
  const [membersToShow, setMembersToShow] = useState(3);
  const [newProtocol, setNewProtocol] = useState(null);
  const agenda_id = location.state?.protocol.agenda.agenda_id;
  const [meeting, setMeeting] = useState({});

  useEffect(() => {
    const fetchAgendaDetails = async () => {
      try {
        const response = await getProtocol(agenda_id);
        setNewProtocol(response);
        console.log(JSON.stringify(response));
        console.log("in ue protocol ap " + JSON.stringify(newProtocol));
      } catch (error) {
        console.error("Error fetching agenda details", error);
      }
    };

    fetchAgendaDetails();
  }, [agenda_id]);

  console.log("AFTER ue protocol " + JSON.stringify(newProtocol));

  if (newProtocol) {
    console.log("Type of newProtocol.meeting: " + typeof newProtocol.meeting);

    if (newProtocol.meeting) {
      console.log(
        "AFTER ue protocol meeting " + JSON.stringify(newProtocol.meeting)
      );
    } else {
      console.log("AFTER ue protocol meeting is null or undefined");
    }
  } else {
    console.log("AFTER ue protocol is null or undefined");
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showAllMembers = () => {
    setMembersToShow(newProtocol.meetingMembers.length);
    openModal();
  };

  if (!newProtocol) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <Card className="card-container">
        <Typography variant="h5" className="members">
          Members
        </Typography>
        <List>
          {protocol.members.slice(0, 3).map((member, index) => (
            <ListItem key={index}>{member.name}</ListItem>
          ))}
        </List>
        <Button variant="outlined" onClick={showAllMembers}>
          Show All Members
        </Button>
      </Card>

      <MemberList
        isOpen={isModalOpen}
        closeModal={closeModal}
        members={protocol.members}
      /> */}
      <Card className="card-container">
        <Typography variant="h2">Meeting Protocol</Typography>
        <TableContainer className="table-container-details">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Meeting Time:</Typography>
                  <Typography variant="h6">
                    {newProtocol.meeting && newProtocol.meeting.start_time} -{" "}
                    {newProtocol.meeting && newProtocol.meeting.end_time}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Meeting Date:</Typography>
                  <Typography variant="h6">
                    {newProtocol.meeting && newProtocol.meeting.date}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Meeting Place:</Typography>
                  <Typography variant="h6">
                    {newProtocol.meeting && newProtocol.meeting.address}
                  </Typography>
                  <Typography variant="h6">
                    {newProtocol.meeting && newProtocol.meeting.building}
                  </Typography>
                  <Typography variant="h6">
                    {newProtocol.meeting && newProtocol.meeting.room}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableCell>
                {/* <Card className="card-members"> */}
                <Typography variant="h5" className="members">
                  Members
                </Typography>
                <List>
                  {newProtocol.meetingMembers &&
                    newProtocol.meetingMembers
                      .slice(0, 3)
                      .map((member, index) => (
                        <ListItem key={index}>
                          {member.first_name} {member.last_name} {member.email}
                        </ListItem>
                      ))}
                </List>
                <Button variant="outlined" onClick={showAllMembers}>
                  Show All Members
                </Button>
                {/* </Card> */}

                <MemberList
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  members={newProtocol.meeting && newProtocol.meetingMembers}
                />
              </TableCell>
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
              </TableRow>
              {newProtocol.actionPoints &&
                newProtocol.actionPoints.map(
                  (actionPoint, actionPointIndex) => (
                    <TableRow key={actionPointIndex}>
                      <TableCell>
                        <Typography variant="body1">
                          {actionPointIndex + 1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" className="agenda-item-title">
                          {actionPoint.text}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <List>
                          {actionPoint.subpoints &&
                            actionPoint.subpoints.map(
                              (subPoint, subPointIndex) => (
                                <div key={subPointIndex}>
                                  <ListItem>{subPoint.message}</ListItem>
                                  {subPoint.notes &&
                                    subPoint.notes.length > 0 && (
                                      <ListItem className="notes-text">
                                        Notes
                                      </ListItem>
                                    )}
                                  {subPoint.notes && (
                                    <div className="note-list">
                                      {subPoint.notes.map((note, noteIndex) => (
                                        <ListItem key={noteIndex}>
                                          {note}
                                        </ListItem>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                        </List>
                      </TableCell>
                      <TableCell>
                        <List>
                          {actionPoint.comments &&
                            actionPoint.comments.map(
                              (comment, commentIndex) => (
                                <div key={commentIndex}>
                                  <ListItem>{comment.comment_text}</ListItem>
                                  {comment.notes &&
                                    comment.notes.length > 0 && (
                                      <ListItem className="notes-text">
                                        Notes
                                      </ListItem>
                                    )}
                                  {comment.notes && (
                                    <div className="note-list">
                                      {comment.notes.map((note, noteIndex) => (
                                        <ListItem key={noteIndex}>
                                          {note}
                                        </ListItem>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                        </List>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ViewProtocol;
