/*
TODO:
add members button with member picker
finalize agenda
invite to edit/comment
*/

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import "./style.css";

const dummyData = {
  meetingTime: "10:00am",
  meetingDate: "2022-05-01",
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
      subPoints: [{ title: "Reported issues" }, { title: "Plans for updates" }],
      comments: [],
    },
  ],
};

const MeetingDetails = () => {
  const [meetingTime, setMeetingTime] = useState(dummyData.meetingTime);
  const [meetingDate, setMeetingDate] = useState(dummyData.meetingDate);
  const [meetingPlace, setMeetingPlace] = useState(dummyData.meetingPlace);
  const [actionPoints, setActionPoints] = useState(dummyData.actionPoints);

  const handleMeetingTimeChange = (event) => {
    setMeetingTime(event.target.value);
  };

  const handleMeetingDateChange = (event) => {
    setMeetingDate(event.target.value);
  };

  const handleMeetingPlaceChange = (event) => {
    setMeetingPlace(event.target.value);
  };

  const handleActionPointTitleChange = (index, event) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[index].title = event.target.value;
    setActionPoints(updatedActionPoints);
  };

  const handleSubPointTitleChange = (
    actionPointIndex,
    subPointIndex,
    event
  ) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[actionPointIndex].subPoints[subPointIndex].title =
      event.target.value;
    setActionPoints(updatedActionPoints);
  };

  const handleCommentTitleChange = (actionPointIndex, commentsIndex, event) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[actionPointIndex].comments[commentsIndex].title =
      event.target.value;
    setActionPoints(updatedActionPoints);
  };

  const handleAddActionPoint = () => {
    const updatedActionPoints = [
      ...actionPoints,
      { title: "", subPoints: [], comments: [] },
    ];
    setActionPoints(updatedActionPoints);
  };

  const handleAddSubPoint = (actionPointIndex) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[actionPointIndex].subPoints.push({
      title: "",
    });
    setActionPoints(updatedActionPoints);
  };

  const handleAddComment = (actionPointIndex) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[actionPointIndex].comments.push({
      title: "",
    });
    setActionPoints(updatedActionPoints);
  };

  const handleDeleteActionPoint = (index) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints.splice(index, 1);
    setActionPoints(updatedActionPoints);
  };

  const handleDeleteSubPoint = (actionPointIndex, subPointIndex) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[actionPointIndex].subPoints.splice(subPointIndex, 1);
    setActionPoints(updatedActionPoints);
  };

  const handleDeleteComment = (actionPointIndex, commentsIndex) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[actionPointIndex].comments.splice(commentsIndex, 1);
    setActionPoints(updatedActionPoints);
  };

  const handleSave = () => {
    const agenda = {
      meetingTime,
      meetingDate,
      meetingPlace,
      actionPoints: actionPoints.map((actionPoint) => ({
        title: actionPoint.title,
        subPoints: actionPoint.subPoints.map((subPoint) => ({
          title: subPoint.title,
        })),
        comments: actionPoint.comments.map((comments) => ({
          title: comments.title,
        })),
      })),
    };
    console.log(agenda);
  };

  return (
    <div>
      <Card className="cardParent">
        <TextField
          label="Meeting Time"
          value={meetingTime}
          onChange={handleMeetingTimeChange}
        />
        <TextField
          label="Meeting Date"
          type="date"
          value={meetingDate}
          onChange={handleMeetingDateChange}
        />
        <TextField
          label="Meeting Place"
          value={meetingPlace}
          onChange={handleMeetingPlaceChange}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action Points</TableCell>
                <TableCell>Sub-Points</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actionPoints.map((actionPoint, index) => (
                <TableRow key={index}>
                  <TableCell className="tableCell">
                    <TextField
                      className="actionPoints"
                      value={actionPoint.title}
                      onChange={(e) => handleActionPointTitleChange(index, e)}
                    />
                  </TableCell>
                  <TableCell className="actionSubPoints">
                    {actionPoint.subPoints.map((subPoint, subIndex) => (
                      <div key={subIndex}>
                        <TextField
                          value={subPoint.title}
                          onChange={(e) =>
                            handleSubPointTitleChange(index, subIndex, e)
                          }
                        />
                        <IconButton
                          onClick={() => handleDeleteSubPoint(index, subIndex)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}
                    <IconButton onClick={() => handleAddSubPoint(index)}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell className="comments">
                    {actionPoint.comments.map((comments, commentsIndex) => (
                      <div key={commentsIndex}>
                        <TextField
                          value={comments.title}
                          onChange={(e) =>
                            handleCommentTitleChange(index, commentsIndex, e)
                          }
                        />
                        <IconButton
                          onClick={() =>
                            handleDeleteComment(index, commentsIndex)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}
                    <IconButton onClick={() => handleAddComment(index)}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDeleteActionPoint(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" onClick={handleAddActionPoint}>
          Add Action Point
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Card>
    </div>
  );
};

export default MeetingDetails;
