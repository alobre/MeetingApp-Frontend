import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { useLocation } from "react-router-dom";
import ViewProtocol from "routes/ViewProtocol";
import {
  getAgenda,
  getActionPoints,
  deleteActionPointComment,
  deleteActionPointSubPoint,
  deleteActionPoint,
  postActionPoint,
  postActionPointComment,
  postActionPointSubPoint,
  updateActionPoint,
  updateActionPointComment,
  updateActionPointSubPoint,
  editMeeting,
  deleteMeeting,
  insertCommentNotes,
  insertSubpointNotes,
} from "components/AxiosInterceptor/AxiosInterceptor";

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
import MemberList from "components/MemberList";

const WriteProtocol = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const agenda_id = location.state?.agenda.agenda.agenda_id;

  const [agenda, setAgenda] = useState(null);
  const [meetingNotes, setMeetingNotes] = useState([]);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteItem, setNoteItem] = useState(null);
  const [addNoteItem, setAddNoteItem] = useState(null);
  const [editNoteItem, setEditNoteItem] = useState(null);
  // const [newSubPointText, setNewSubPointText] = useState("");
  const [subPointTexts, setSubPointTexts] = useState([]);
  const [newAgenda, setNewAgenda] = useState(agenda);
  const [newActionPointText, setNewActionPointText] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [membersToShow, setMembersToShow] = useState(3);

  useEffect(() => {
    const fetchAgendaDetails = async () => {
      try {
        const response = await getAgenda(agenda_id);
        setAgenda(response);
        console.log("in useeffect: " + JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching agenda details", error);
      }
    };

    fetchAgendaDetails();
  }, [agenda_id]);

  console.log("after useeffect: " + JSON.stringify(agenda));

  if (agenda) {
    agenda.actionPoints.sort((a, b) => a.action_point_id - b.action_point_id);
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showAllMembers = () => {
    if (agenda && agenda.meetingMembers) {
      setMembersToShow(agenda.meetingMembers.length);
      openModal();
    }
  };

  const handleAddSubPoint = async (actionPointIndex) => {
    const updatedAgenda = { ...agenda };
    const selectedActionPoint = updatedAgenda.actionPoints[actionPointIndex];

    if (!selectedActionPoint.subpoints) {
      selectedActionPoint.subpoints = [];
    }

    const newSubPoint = {
      message: subPointTexts[actionPointIndex],
      notes: [],
      addToDB: true,
    };

    selectedActionPoint.subpoints.push(newSubPoint);

    setAgenda(updatedAgenda);

    setSubPointTexts((prevTexts) => {
      const newTexts = [...prevTexts];
      newTexts[actionPointIndex] = "";
      return newTexts;
    });
  };

  const handleAddActionPoint = () => {
    const updatedAgenda = { ...agenda };
    const newActionPoint = {
      text: newActionPointText,
      subpoints: [],
      comments: [],
      addToDB: true,
    };
    updatedAgenda.actionPoints.push(newActionPoint);
    setAgenda(updatedAgenda);
    setNewActionPointText("");
  };

  const handleEditSubPoint = (actionPointIndex, subPointIndex) => {
    const updatedAgenda = { ...agenda };
    const selectedSubPoint =
      updatedAgenda.actionPoints[actionPointIndex].subpoints[subPointIndex];
    setNewActionPointText(selectedSubPoint.message);
    setAddNoteItem({ actionPointIndex, subPointIndex });
  };

  const handleDeleteSubPoint = async (
    actionPointIndex,
    subPointIndex,
    actionPointSubpointId
  ) => {
    console.log("sp to delete id: " + actionPointSubpointId);

    const updatedAgenda = { ...agenda };
    const selectedActionPoint = updatedAgenda.actionPoints[actionPointIndex];
    selectedActionPoint.subpoints.splice(subPointIndex, 1);
    setAgenda(updatedAgenda);

    const res = await deleteActionPointSubPoint(actionPointSubpointId);
  };

  const handleMeetingNotesChange = (event, index) => {
    const updatedMeetingNotes = [...meetingNotes];
    updatedMeetingNotes[index] = event.target.value;
    setMeetingNotes(updatedMeetingNotes);
  };

  const getNotesFromItem = (item) => {
    console.log("item in getNotesFromItem:", item);

    if (item.subPointIndex !== undefined && item.commentIndex !== undefined) {
      console.log("Accessing comment notes");
      return agenda.actionPoints[item.actionPointIndex].comments[
        item.commentIndex
      ].notes[item.noteIndex];
    } else if (item.subPointIndex !== undefined) {
      console.log("Accessing subpoint notes");
      return agenda.actionPoints[item.actionPointIndex].subpoints[
        item.subPointIndex
      ].notes[item.noteIndex];
    }

    console.log("No notes found");
    return "";
  };

  const handleEditNote = (item, noteIndex) => {
    const noteItem = { ...item, noteIndex };
    setEditNoteItem(noteItem);
    console.log("noteItem:", noteItem);

    const subPoint =
      agenda.actionPoints[item.actionPointIndex].subpoints[item.subPointIndex];
    console.log("subPoint:", subPoint);

    setNoteText(getNotesFromItem(noteItem));
    setNoteItem(noteItem);
    setNoteModalOpen(true);
  };

  const handleAddNote = (item) => {
    console.log("item: " + JSON.stringify(item));
    const noteItem = { ...item };
    setAddNoteItem(noteItem);
    setNoteText("");
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
          updatedAgenda.actionPoints[actionPointIndex].subpoints[subPointIndex];

        if (!selectedSubPoint.notes) {
          selectedSubPoint.notes = [];
        }
        selectedSubPoint.notes[noteIndex] = updatedNotes;
      } else if (subPointIndex === undefined && commentIndex !== undefined) {
        const selectedComment =
          updatedAgenda.actionPoints[actionPointIndex].comments[commentIndex];
        if (!selectedComment.notes) {
          selectedComment.notes = [];
        }
        selectedComment.notes[noteIndex] = updatedNotes;
      }

      const updatedMeetingNotes = [...meetingNotes];
      updatedMeetingNotes[actionPointIndex] = updatedNotes.join("\n");
      setMeetingNotes(updatedMeetingNotes);

      setEditNoteItem(null);
      setNoteItem(null);
      setNoteModalOpen(false);
      setAgenda(updatedAgenda);
    } else if (addNoteItem !== null) {
      const { actionPointIndex, subPointIndex, commentIndex } = addNoteItem;
      const updatedAgenda = { ...agenda };

      if (subPointIndex !== undefined && commentIndex === undefined) {
        const selectedSubPoint =
          updatedAgenda.actionPoints[actionPointIndex].subpoints[subPointIndex];
        if (!selectedSubPoint.notes) {
          selectedSubPoint.notes = [];
        }
        selectedSubPoint.notes.push(...updatedNotes);
      } else if (subPointIndex === undefined && commentIndex !== undefined) {
        const selectedComment =
          updatedAgenda.actionPoints[actionPointIndex].comments[commentIndex];
        if (!selectedComment.notes) {
          selectedComment.notes = [];
        }
        selectedComment.notes.push(...updatedNotes);
      }

      setAgenda(updatedAgenda);

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
          selectedActionPoint.subpoints[item.subPointIndex];
        selectedSubPoint.notes = updatedNotes;
        selectedActionPoint.subpoints[item.subPointIndex] = selectedSubPoint;
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
    return <div>Loading...</div>;
  }

  const handleSaveProtocol = async () => {
    try {
      const agendaData = {
        text: agenda.text,
      };

      // save and action points and subpoints and notes
      for (const actionPoint of agenda.actionPoints) {
        const actionPointData = {
          agenda_id: agenda.agenda_id,
          text: actionPoint.text,
        };

        let actionPointId;
        if (actionPoint.addToDB) {
          actionPointId = await postActionPoint(actionPoint.text, agenda_id);
          actionPoint.action_point_id = actionPointId;
        }

        // subpoints
        for (const subpoint of actionPoint.subpoints) {
          const subpointData = {
            action_point_id: actionPoint.action_point_id,
            message: subpoint.message,
          };

          let subpointId;
          if (subpoint.addToDB && actionPoint.addToDB) {
            subpointId = await postActionPointSubPoint(
              subpoint.message,
              actionPointId
            );
            subpoint.action_point_id = actionPointId;
          } else if (subpoint.addToDB && !actionPoint.addToDB) {
            subpointId = await postActionPointSubPoint(
              subpoint.message,
              actionPoint.action_point_id.actionPointId
            );
            subpoint.action_point_id = actionPoint.action_point_id;
          }
          // sp notes TODO addToDB check
          if (subpoint.notes && subpoint.notes.length > 0) {
            for (const note of subpoint.notes) {
              const subpointNotesData = {
                action_point_subpoint_id: subpoint.action_point_subpoint_id,
                text: note,
              };

              await insertSubpointNotes(subpointNotesData);
            }
          }
        }

        // comments

        for (const comment of actionPoint.comments) {
          const commentData = {
            action_point_id: actionPoint.action_point_id,
            comment_text: comment.comment_text,
          };

          // comment notes
          if (comment.notes && comment.notes.length > 0) {
            for (const note of comment.notes) {
              const commentNotesData = {
                action_point_comment_id: comment.action_point_comment_id,
                text: note,
              };

              await insertCommentNotes(commentNotesData);
            }
          }
        }
      }

      const protocol = { ...agenda };
      navigate("/ViewProtocol", { state: { protocol } });
    } catch (error) {
      console.error("Error saving protocol to the database", error);
    }
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
                  <Typography variant="h6">
                    {agenda.meeting.start_time} - {agenda.meeting.end_time}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Meeting Date:</Typography>
                  <Typography variant="h6">{agenda.meeting.date}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Meeting Place:</Typography>
                  <Typography variant="h6">{agenda.meeting.address}</Typography>
                  <Typography variant="h6">
                    {agenda.meeting.building}
                  </Typography>
                  <Typography variant="h6">{agenda.meeting.room}</Typography>
                </TableCell>
              </TableRow>

              <TableCell>
                <Typography variant="h5" className="members">
                  Members
                </Typography>
                <List>
                  {agenda.meetingMembers.slice(0, 3).map((member, index) => (
                    <ListItem key={index}>
                      {member.first_name} {member.last_name} {member.email}
                    </ListItem>
                  ))}
                </List>
                <Button variant="outlined" onClick={showAllMembers}>
                  Show All Members
                </Button>

                <MemberList
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  members={agenda.meetingMembers}
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
              {agenda.actionPoints.map((actionPoint, actionPointIndex) => (
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
                      {actionPoint.subpoints.map((subPoint, subPointIndex) => (
                        <div key={subPointIndex}>
                          <ListItem>
                            {subPoint.message}
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
                            <IconButton
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                handleDeleteSubPoint(
                                  actionPointIndex,
                                  subPointIndex,
                                  subPoint.action_point_subpoint_id
                                )
                              }
                            >
                              <DeleteIcon />
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
                                    onClick={() => {
                                      console.log(
                                        "Calling handleEditNote with:",
                                        actionPointIndex,
                                        subPointIndex,
                                        noteIndex
                                      );

                                      handleEditNote(
                                        { actionPointIndex, subPointIndex },
                                        noteIndex
                                      );
                                    }}
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
                      <ListItem>
                        <TextField
                          className="new-subpoint-input"
                          value={subPointTexts[actionPointIndex]}
                          onChange={(event) =>
                            setSubPointTexts((prevTexts) => {
                              const newTexts = [...prevTexts];
                              newTexts[actionPointIndex] = event.target.value;
                              return newTexts;
                            })
                          }
                          placeholder="Add sub-point"
                          variant="outlined"
                          size="small"
                        />
                        <IconButton
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            handleAddSubPoint(
                              actionPointIndex,
                              actionPoint.action_point_id
                            )
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <List>
                      {actionPoint.comments.map((comment, commentIndex) => (
                        <div key={commentIndex}>
                          <ListItem>
                            {comment.comment_text}
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
              <TableRow>
                <TableCell>
                  <TextField
                    className="new-actionpoint-input"
                    value={newActionPointText}
                    onChange={(event) =>
                      setNewActionPointText(event.target.value)
                    }
                    placeholder="Add action point"
                    variant="outlined"
                    size="small"
                  />
                  <IconButton
                    variant="outlined"
                    size="small"
                    onClick={handleAddActionPoint}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
