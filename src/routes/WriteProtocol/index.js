import React, { useState } from "react";
import Card from "@mui/material/Card";
import { useLocation } from "react-router-dom";
import ViewProtocol from "routes/ViewProtocol";

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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, Navigate } from "react-router-dom";

import "./style.css";
import { Add } from "@mui/icons-material";

const WriteProtocol = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const agenda = location.state?.agenda;

  const [meetingNotes, setMeetingNotes] = useState(
    Array(agenda.actionPoints.length).fill("")
  );
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteItem, setNoteItem] = useState(null);
  const [addNoteItem, setAddNoteItem] = useState(null);
  const [editNoteItem, setEditNoteItem] = useState(null);

  const handleMeetingNotesChange = (event, index) => {
    const updatedMeetingNotes = [...meetingNotes];
    updatedMeetingNotes[index] = event.target.value;
    setMeetingNotes(updatedMeetingNotes);
  };

  const getNotesFromItem = (item) => {
    if (item.subPointIndex !== undefined && item.commentIndex !== undefined) {
      return agenda.actionPoints[item.actionPointIndex].comments[
        item.commentIndex
      ].notes[item.noteIndex];
    } else if (item.subPointIndex !== undefined) {
      return agenda.actionPoints[item.actionPointIndex].subPoints[
        item.subPointIndex
      ].notes[item.noteIndex];
    }

    return "";
  };

  const handleEditNote = (item, noteIndex) => {
    const noteItem = { ...item, noteIndex };
    setEditNoteItem(noteItem);
    setNoteText(getNotesFromItem(noteItem));
    setNoteItem(noteItem);
    setNoteModalOpen(true);
  };

  const handleAddNote = (item) => {
    const noteItem = { ...item };
    setAddNoteItem(noteItem);
    setNoteText("");
    setNoteItem(noteItem);
    setNoteModalOpen(true);
  };

  const handleNoteCancel = () => {
    setNoteModalOpen(false);
    setNoteText("");
    setNoteItem(null);
  };

  const handleNoteSave = () => {
    const updatedNotes = noteText.split("\n");

    if (editNoteItem !== null) {
      const { actionPointIndex, subPointIndex, commentIndex, noteIndex } =
        editNoteItem;
      const updatedAgenda = { ...agenda };

      if (subPointIndex !== undefined && commentIndex === undefined) {
        const selectedSubPoint =
          updatedAgenda.actionPoints[actionPointIndex].subPoints[subPointIndex];
        if (!selectedSubPoint.notes) {
          selectedSubPoint.notes = [];
        }
        selectedSubPoint.notes[noteIndex] = updatedNotes;
      } else if (subPointIndex === undefined && commentIndex !== undefined) {
        const selectedComment =
          updatedAgenda.actionPoints[actionPointIndex].comments[commentIndex];
        if (!selectedComment.notes) {
          selectedComment.notes = []; //
        }
        selectedComment.notes[noteIndex] = updatedNotes;
      }

      const updatedMeetingNotes = [...meetingNotes];
      updatedMeetingNotes[actionPointIndex] = updatedNotes.join("\n");
      setMeetingNotes(updatedMeetingNotes);

      setEditNoteItem(null);
      setNoteItem(null);
      setNoteModalOpen(false);
    } else if (addNoteItem !== null) {
      const { actionPointIndex, subPointIndex, commentIndex } = addNoteItem;
      const updatedAgenda = { ...agenda };

      if (subPointIndex !== undefined && commentIndex === undefined) {
        const selectedSubPoint =
          updatedAgenda.actionPoints[actionPointIndex].subPoints[subPointIndex];
        if (!selectedSubPoint.notes) {
          selectedSubPoint.notes = [];
        }
        selectedSubPoint.notes.push(updatedNotes);
      } else if (subPointIndex === undefined && commentIndex !== undefined) {
        const selectedComment =
          updatedAgenda.actionPoints[actionPointIndex].comments[commentIndex];
        if (!selectedComment.notes) {
          selectedComment.notes = [];
        }
        selectedComment.notes.push(updatedNotes);
      }

      const updatedMeetingNotes = [...meetingNotes];
      updatedMeetingNotes[actionPointIndex] = updatedNotes.join("\n");
      setMeetingNotes(updatedMeetingNotes);

      setAddNoteItem(null);
      setNoteItem(null);
      setNoteModalOpen(false);
    }
  };

  const handleDeleteNote = (item, noteIndex) => {
    if (item.notes) {
      const updatedNotes = item.notes.filter((_, index) => index !== noteIndex);
      item.notes = updatedNotes;

      const updatedActionPoints = [...agenda.actionPoints];
      const selectedActionPoint = updatedActionPoints[item.actionPointIndex];

      if (item.hasOwnProperty("subPointIndex")) {
        const selectedSubPoint =
          selectedActionPoint.subPoints[item.subPointIndex];
        selectedSubPoint.notes = updatedNotes;
        selectedActionPoint.subPoints[item.subPointIndex] = selectedSubPoint;
      } else if (item.hasOwnProperty("commentIndex")) {
        const selectedComment = selectedActionPoint.comments[item.commentIndex];
        selectedComment.notes = updatedNotes;
        selectedActionPoint.comments[item.commentIndex] = selectedComment;
      }

      updatedActionPoints[item.actionPointIndex] = selectedActionPoint;
      const updatedAgenda = { ...agenda, actionPoints: updatedActionPoints };
      console.log("Updated Agenda:", updatedAgenda);

      const updatedMeetingNotes = [...meetingNotes];
      updatedMeetingNotes[item.actionPointIndex] = updatedNotes.join("\n");
      setMeetingNotes(updatedMeetingNotes);
    }
  };

  if (!agenda) {
    return <div>No agenda found.</div>;
  }

  const handleSaveProtocol = () => {
    const protocol = {
      meetingDate: agenda.meetingDate,
      meetingTime: agenda.meetingTime,
      meetingPlace: agenda.meetingPlace,
      members: agenda.members,
      agendaPoints: agenda.actionPoints.map((actionPoint, index) => ({
        title: actionPoint.title,
        subPoints: actionPoint.subPoints.map((subPoint) => ({
          ...subPoint,
          notes: subPoint.notes || [],
        })),
        comments: actionPoint.comments.map((comment) => ({
          ...comment,
          notes: comment.notes || [],
        })),
        meetingNotes: meetingNotes[index],
      })),
    };
    navigate("/ViewProtocol", { state: { protocol } }); // Pass the agenda object in the state

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
              </TableRow>
              {agenda.actionPoints.map((actionPoint, actionPointIndex) => (
                <TableRow key={actionPointIndex}>
                  <TableCell>
                    <Typography variant="body1">
                      {actionPointIndex + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" className="agenda-item-title">
                      {actionPoint.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <List>
                      {actionPoint.subPoints.map((subPoint, subPointIndex) => (
                        <div key={subPointIndex}>
                          <ListItem>
                            {subPoint.title}
                            <IconButton
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                handleAddNote({
                                  actionPointIndex,
                                  subPointIndex,
                                })
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </ListItem>
                          {subPoint.notes && (
                            <div className="note-list">
                              {subPoint.notes.map((note, noteIndex) => (
                                <ListItem key={noteIndex}>
                                  {note}
                                  <IconButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                      handleEditNote(
                                        { actionPointIndex, subPointIndex },
                                        noteIndex
                                      )
                                    }
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                      handleDeleteNote(subPoint, noteIndex)
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </ListItem>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>
                    <List>
                      {actionPoint.comments.map((comment, commentIndex) => (
                        <div key={commentIndex}>
                          <ListItem>
                            {comment.title}
                            <IconButton
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                handleAddNote({
                                  actionPointIndex,
                                  commentIndex,
                                })
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </ListItem>
                          {comment.notes && (
                            <div className="note-list">
                              {comment.notes.map((note, noteIndex) => (
                                <ListItem key={noteIndex}>
                                  {note}
                                  <IconButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                      handleEditNote(
                                        { actionPointIndex, commentIndex },
                                        noteIndex
                                      )
                                    }
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                      handleDeleteNote(comment, noteIndex)
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </ListItem>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </List>
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
      <Modal open={noteModalOpen} onClose={handleNoteCancel} className="modal">
        <div className="modalBody">
          <TextField
            className="modalTextField"
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
            label="Add Note"
            multiline
            rows={4}
            variant="outlined"
          />
          <Button variant="contained" onClick={handleNoteSave}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default WriteProtocol;
