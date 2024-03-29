/*
  "Route" for editing a meeting agenda. 
  The top part is redarding the meeting details - here the user can add more
  members to the meeting, edit button saves the updates to database and delete 
  removes the meeting and all other corresponding details from the database.

  The agenda part is for agenda details. 
  Each agenda has action points, subpoints and comments that go along that action point.
  Save saves/updates the agenda in the database; finalize "finalizes" the agenda and
  from that point on the agenda is not editable.
*/

import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
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
import { useLocation } from "react-router-dom";
import AddMemberModal from "components/AddMember";
import { useNavigate, Navigate } from "react-router-dom";
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
} from "components/AxiosInterceptor/AxiosInterceptor";
import { AvatarGroup } from "@mui/material";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

const MeetingDetails = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [meetingDetails, setMeetingsDetails] = useState(state.meeting);
  const [meetingTime, setMeetingTime] = useState(meetingDetails?.startTime);
  const [meetingStart, setMeetingStart] = useState(meetingDetails?.start_time);
  const [meetingEnd, setMeetingEnd] = useState(meetingDetails?.end_time);
  const [meetingDate, setMeetingDate] = useState(meetingDetails?.date);
  const [meetingAddress, setMeetingAddress] = useState(meetingDetails?.address);
  const [meetingBuilding, setMeetingBuilding] = useState(
    meetingDetails?.building
  );
  const [meetingRoom, setMeetingRoom] = useState(meetingDetails?.room);

  const [actionPoints, setActionPoints] = useState();
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [members, setMembers] = useState(meetingDetails?.members);

  const [actionPointIdCounter, setActionPointIdCounter] = useState(5000);
  const [subPointIdCounter, setSubPointIdCounter] = useState(4000);
  const [commentIdCounter, setCommentIdCounter] = useState(3000);

  const active_uid = localStorage.getItem("active_uid");

  console.log("members in edit: " + JSON.stringify(members));

  const fetchAgenda = async () => {
    const parsedDate = dayjs(meetingDetails.date, { format: "YYYY-MM-DD" });
    const formattedDate = parsedDate.format("YYYY-MM-DD");
    setMeetingDate(formattedDate);

    let actionPoints = await getActionPoints(state.agenda_id);
    actionPoints.sort((a, b) => a.action_point_id - b.action_point_id);

    setActionPoints(actionPoints);
  };
  useEffect(() => {
    fetchAgenda();
  }, []);

  const handleStartTimeChange = (date) => {
    setMeetingStart(dayjs(date).format("HH:mm"));
  };

  const handleEndTimeChange = (date) => {
    setMeetingEnd(dayjs(date).format("HH:mm"));
  };

  const handleMeetingDateChange = (event) => {
    console.log("change meeting date " + event.target.value);
    setMeetingDate(event.target.value);
  };

  const handleMeetingAddressChange = (event) => {
    setMeetingAddress(event.target.value);
  };

  const handleMeetingBuildingChange = (event) => {
    setMeetingBuilding(event.target.value);
  };

  const handleMeetingRoomChange = (event) => {
    setMeetingRoom(event.target.value);
  };

  const handleActionPointTitleChange = (index, event) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[index].text = event.target.value;
    if (
      updatedActionPoints[index].addToDB == false ||
      updatedActionPoints[index].addToDB == undefined
    )
      updatedActionPoints[index].updateActionPointTitle = true;
    setActionPoints(updatedActionPoints);
  };

  const handleSubPointMessageChange = (
    actionPointIndex,
    subPointIndex,
    event
  ) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[actionPointIndex].actionPointSubPoints[
      subPointIndex
    ].message = event.target.value;
    if (
      updatedActionPoints[actionPointIndex].actionPointSubPoints[subPointIndex]
        .addToDB == false ||
      updatedActionPoints[actionPointIndex].actionPointSubPoints[subPointIndex]
        .addToDB == undefined
    )
      updatedActionPoints[actionPointIndex].actionPointSubPoints[
        subPointIndex
      ].updateSubPointMessage = true;
    updatedActionPoints[actionPointIndex].changesSubPoints = true;
    setActionPoints(updatedActionPoints);
  };

  const handleCommentTextChange = (actionPointIndex, commentsIndex, event) => {
    const updatedActionPoints = [...actionPoints];
    updatedActionPoints[actionPointIndex].actionPointComments[
      commentsIndex
    ].comment_text = event.target.value;
    if (
      updatedActionPoints[actionPointIndex].actionPointComments[commentsIndex]
        .addToDB == false ||
      updatedActionPoints[actionPointIndex].actionPointComments[commentsIndex]
        .addToDB == undefined
    )
      updatedActionPoints[actionPointIndex].actionPointComments[
        commentsIndex
      ].updateActionPointComment = true;
    updatedActionPoints[actionPointIndex].changesComments = true;
    setActionPoints(updatedActionPoints);
  };

  const handleAddActionPoint = () => {
    const newActionPoint = {
      text: "",
      actionPointSubPoints: [],
      actionPointComments: [],
      action_point_id: actionPointIdCounter,
      agenda_id: meetingDetails.agenda_id,
      addToDB: true,
    };
    const updatedActionPoints = [...actionPoints, newActionPoint];
    setActionPointIdCounter(actionPointIdCounter + 1);
    setActionPoints(updatedActionPoints);
  };

  const handleAddSubPoint = (actionPointIndex) => {
    console.log(
      "AP INDEX AND ID " +
        actionPointIndex +
        actionPoints[actionPointIndex].action_point_id
    );
    const updatedActionPoints = [...actionPoints];
    const newSubPoint = {
      message: "",
      action_point_id: actionPoints[actionPointIndex].action_point_id,
      addToDB: true,
      actionPointSubPointId: subPointIdCounter,
    };
    updatedActionPoints[actionPointIndex].actionPointSubPoints.push(
      newSubPoint
    );
    updatedActionPoints[actionPointIndex].newActionPointSubPoint = true;
    setActionPoints(updatedActionPoints);
    setSubPointIdCounter(subPointIdCounter + 1);
  };

  const handleAddComment = (actionPointIndex) => {
    const updatedActionPoints = [...actionPoints];
    const newComment = {
      comment_text: "",
      addToDB: true,
      comment_id: commentIdCounter,
    };
    updatedActionPoints[actionPointIndex].actionPointComments.push(newComment);
    setActionPoints(updatedActionPoints);
    setCommentIdCounter(commentIdCounter + 1);
  };

  const handleDeleteActionPoint = async (index) => {
    const action_point_id = actionPoints[index].action_point_id;
    const res = await deleteActionPoint(action_point_id);
    fetchAgenda();
  };

  const handleDeleteSubPoint = async (action_point_subpoint_id) => {
    const res = await deleteActionPointSubPoint(action_point_subpoint_id);
    fetchAgenda();
  };

  const handleDeleteComment = async (comment_id) => {
    const res = await deleteActionPointComment(comment_id);
    fetchAgenda();
  };

  const handleSave = () => {
    const agenda = {
      id: state.agenda_id,
      meetingStart,
      meetingEnd,
      meetingDate,
      meetingAddress,
      meetingBuilding,
      meetingRoom,
      actionPoints: actionPoints?.map((actionPoint) => ({
        title: actionPoint.title,
        subPoints: actionPoint.subPoints?.map((subPoint) => ({
          title: subPoint.title,
        })),
        comments: actionPoint.comments?.map((comments) => ({
          title: comments.title,
        })),
      })),
      members,
    };
    navigate("/ViewAgenda", { state: { agenda } });
  };

  const handleMemberSave = (selectedMembers) => {
    const cleanedMembers = [];

    // reformat what comes from add member modal for comparing for extracting duplicates
    for (const member of selectedMembers) {
      var name = member.first_name.split(", ");
      var cn = name[0];
      var full_name = cn.split(" ");
      var first_name_db = full_name[0];
      var last_name_db = full_name[1];
      var uid = name[1];
      var email_db = name[2];
      var hasRightsToEdit = member.hasRightsToEdit;

      const user = {
        ldap_name: uid,
        first_name: first_name_db,
        last_name: last_name_db,
        email: email_db,
        hasRightsToEdit: hasRightsToEdit,
      };

      // check duplicate
      const existingUser = members.find(
        (existingMember) => existingMember.ldap_name === user.ldap_name
      );

      // if not dupl, insert
      if (!existingUser) {
        cleanedMembers.push(user);
      }
    }

    setMembers((prevMembers) => [...prevMembers, ...cleanedMembers]);
  };

  const MemberList = ({ members }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
      setDropdownOpen(!isDropdownOpen);
    };

    return (
      <Card className="cardMemberList" onClick={handleDropdownClick}>
        <h3>Members:</h3>
        {isDropdownOpen && (
          <ul>
            {members?.map((member, index) => (
              <li key={index}>
                {`${member.first_name || ""} ${member.last_name || ""} ${
                  member.email || ""
                }`}
              </li>
            ))}
          </ul>
        )}
        {!isDropdownOpen && <p>Click to show members of the meeting</p>}
      </Card>
    );
  };

  const updateActionPoints = async () => {
    const updatedActionPoints = [...actionPoints];

    // ssave / update action points
    for (const ap of updatedActionPoints) {
      if (ap.addToDB) {
        // save new ap and get ID
        const newActionPointResult = await postActionPoint(
          ap.text,
          ap.agenda_id
        );
        const newActionPointId = newActionPointResult.action_point_id;
        console.log("returning id in fe " + newActionPointId);

        ap.action_point_id = newActionPointId;
      } else if (ap.updateActionPointTitle) {
        // update existing ap
        await updateActionPoint(ap.text, ap.agenda_id);
      }

      // save/update each comment
      for (const apc of ap.actionPointComments) {
        if (apc.addToDB) {
          // save new comment
          await postActionPointComment(
            active_uid,
            apc.comment_text,
            ap.action_point_id
          );
        } else if (apc.updateActionPointComment) {
          // update existing
          await updateActionPointComment(
            active_uid,
            apc.comment_text,
            ap.action_point_id
          );
        }
      }

      // save/update each sp
      for (const apsp of ap.actionPointSubPoints) {
        if (apsp.addToDB) {
          // save new sp
          console.log("save sp ap id " + ap.action_point_id);

          await postActionPointSubPoint(apsp.message, ap.action_point_id);
        } else if (apsp.updateSubPointMessage) {
          // update subpoint
          await updateActionPointSubPoint(
            apsp.message,
            apsp.action_point_subpoint_id
          );
        }
      }
    }

    // refresh
    fetchAgenda();
  };

  const handleEditMeeting = async () => {
    const meetingId = state.meeting_id;
    const meeting = {
      meetingStart,
      meetingEnd,
      meetingDate,
      meetingAddress,
      meetingBuilding,
      meetingRoom,
      members,
    };
    const response = await editMeeting(meetingId, meeting);
  };

  const meetingIdToDelete = state.meeting_id;
  const handleDeleteMeeting = async () => {
    const response = await deleteMeeting(meetingIdToDelete);
    navigate("/");
  };

  console.log("meet buil " + meetingBuilding);

  return (
    <div>
      <Card className="cardParent">
        <div className="inviteMembersButton"></div>

        <Card className="cardMeetingDetails">
          <h1>{meetingDetails.title}</h1>
          <div className="meetingDetailsContainer">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["TimePicker"]}
                className="timeContainer"
              >
                <TimePicker
                  className="timePicker"
                  type="time"
                  label="Meeting Start"
                  value={dayjs(`2022-04-17T${meetingStart}`)}
                  onChange={(date) => handleStartTimeChange(date)}
                />

                <TimePicker
                  className="timePicker"
                  type="time"
                  label="Meeting End"
                  value={dayjs(`2022-04-17T${meetingEnd}`)}
                  onChange={(date) => handleEndTimeChange(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              label="Meeting Date"
              type="date"
              value={meetingDate}
              onChange={handleMeetingDateChange}
            />
            <TextField
              label="Meeting Address"
              value={meetingAddress}
              onChange={handleMeetingAddressChange}
            />
            <TextField
              label="Meeting Building"
              value={meetingBuilding}
              onChange={handleMeetingBuildingChange}
            />
            <TextField
              label="Meeting Room"
              value={meetingRoom}
              onChange={handleMeetingRoomChange}
            />
          </div>
          <div className="memberListContainer">
            <MemberList members={members} />
          </div>
          <div className="button-container">
            <div className="button-group">
              <Button
                variant="contained"
                onClick={() => setMemberModalOpen(true)}
              >
                Add Member
              </Button>
              <AddMemberModal
                isOpen={isMemberModalOpen}
                onClose={() => setMemberModalOpen(false)}
                onSave={handleMemberSave}
                externalMembers={members}
              />
            </div>
            <div className="button-group">
              <Button variant="contained" onClick={handleEditMeeting}>
                Edit
              </Button>
            </div>
            <div className="button-group">
              <Button variant="contained" onClick={handleDeleteMeeting}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Action Points</TableCell>
                <TableCell>Sub-Points</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actionPoints?.map((actionPoint, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="tableCell">
                    <TextField
                      className="actionPoints"
                      value={actionPoint.text}
                      onChange={(e) => handleActionPointTitleChange(index, e)}
                    />
                  </TableCell>
                  <TableCell className="actionSubPoints">
                    {actionPoint.actionPointSubPoints?.map(
                      (subPoint, subIndex) => (
                        <div key={subIndex}>
                          <TextField
                            value={subPoint.message}
                            onChange={(e) =>
                              handleSubPointMessageChange(index, subIndex, e)
                            }
                          />
                          <IconButton
                            onClick={() =>
                              handleDeleteSubPoint(
                                subPoint.action_point_subpoint_id,
                                index
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )
                    )}
                    <IconButton onClick={() => handleAddSubPoint(index)}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell className="comments">
                    {actionPoint.actionPointComments?.map(
                      (comment, commentsIndex) => (
                        <div key={commentsIndex}>
                          <TextField
                            value={comment.comment_text}
                            onChange={(e) =>
                              handleCommentTextChange(index, commentsIndex, e)
                            }
                          />
                          <IconButton
                            onClick={() =>
                              handleDeleteComment(
                                comment.action_point_comment_id
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )
                    )}
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

        <div className="button-container">
          <div className="button-group">
            <Button variant="contained" onClick={handleAddActionPoint}>
              Add Action Point
            </Button>
          </div>
          <div className="button-group">
            <Button variant="contained" onClick={updateActionPoints}>
              save agenda
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Finalize agenda
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MeetingDetails;
