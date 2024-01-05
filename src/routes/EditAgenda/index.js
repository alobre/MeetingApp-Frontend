/*
TODO:
finalize agenda
invite to edit/comment
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

  const fetchAgenda = async () => {
    const parsedDate = dayjs(meetingDetails.date, { format: "YYYY-MM-DD" });
    const formattedDate = parsedDate.format("YYYY-MM-DD");
    setMeetingDate(formattedDate);

    let actionPoints = await getActionPoints(state.agenda_id);
    setActionPoints(actionPoints);
  };
  useEffect(() => {
    fetchAgenda();
  }, []);

  // console.log("State: ", JSON.stringify(state, null, 2));

  // const MeetingDetails = () => {
  //   useEffect(() => {
  //     const avatarContainers = document.querySelectorAll('.avatar-container');

  //     avatarContainers.forEach((container) => {
  //       const avatar = container.querySelector('img');
  //       const hoverLetter = container.querySelector('.hover-letter');

  //       hoverLetter.addEventListener('mouseover', () => {
  //         avatar.src = '';
  //       });

  //       hoverLetter.addEventListener('mouseout', () => {
  //         avatar.src = '/public/Foxl.jpg';
  //       });
  //     });
  //   }, []);

  const handleStartTimeChange = (date) => {
    setMeetingStart(dayjs(date).format("HH:mm"));
  };

  const handleEndTimeChange = (date) => {
    setMeetingEnd(dayjs(date).format("HH:mm"));
  };

  const handleMeetingDateChange = (event) => {
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

    // const comment_id = updatedActionPoints[actionPointIndex].actionPointComments[commentsIndex].comment_id;
    // const allNewComments = [...newComment]
    // const allEditedComments = [...editedComment]
    // allNewComments.map(c => {
    //   if(c.comment_id == comment_id) c.comment_text = event.target.value;
    //   else{
    //     allEditedComments.map(ec =>{
    //       if(ec.comment_id == comment_id){
    //         ec.comment_text = event.target.value;
    //       }else{
    //         allEditedComments.push(updatedActionPoints[actionPointIndex].actionPointComments[commentsIndex])
    //       }
    //     })
    //   }
    // })
    // if(updatedActionPoints[actionPointIndex].actionPointComments[commentsIndex].addToDB){
    //   allNewComments.map(c => {
    //     if(c.comment_id == comment_id) c.comment_text = event.target.value;
    //   })
    //   setNewComment(allNewComments)
    //   setEditedComment(allEditedComments)
    // }
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
    // const updatedActionPoints = actionPoints.map(ap => {
    //   ap.actionPointComments = ap.actionPointComments.filter(apc => apc.action_point_comment_id !== comment_id);
    //   return ap;
    // });
    // setActionPoints(updatedActionPoints);
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
    navigate("/ViewAgenda", { state: { agenda } }); // Pass the agenda object in the state
  };

  const handleMemberSave = (selectedMembers) => {
    // Concatenate the new members to the existing array
    setMembers((prevMembers) => [...prevMembers, ...selectedMembers]);
  };

  const MemberList = ({ members }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
      setDropdownOpen(!isDropdownOpen);
    };

    return (
      // hier members sollten sich erzeugen.
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
    actionPoints.map(async (ap) => {
      if (ap.addToDB) {
        const res = await postActionPoint(ap.text, ap.agenda_id);
      }
      if (ap.updateActionPointTitle) {
        const res = await updateActionPoint(ap.text, ap.agenda_id);
      }
      if (ap.changesComments) {
        ap.actionPointComments.map(async (apc) => {
          if (apc.addToDB == true) {
            const res = await postActionPointComment(
              active_uid,
              apc.comment_text,
              ap.action_point_id
            );
          }
          if (apc.updateActionPointComment == true) {
            const res = await updateActionPointComment(
              active_uid,
              apc.comment_text,
              ap.action_point_id
            );
          }
        });
      }
      if (ap.changesSubPoints) {
        ap.actionPointSubPoints.map(async (apsp) => {
          if (apsp.addToDB == true) {
            const res = await postActionPointSubPoint(
              apsp.message,
              apsp.action_point_id
            );
          }
          if (apsp.updateSubPointMessage == true) {
            const res = await updateActionPointSubPoint(
              apsp.message,
              apsp.action_point_subpoint_id
            );
          }
        });
      }
    });
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
    // console.log("edited meeting " + JSON.stringify(meeting));
    const response = await editMeeting(meetingId, meeting);
    // console.log("Meeting edited:", response);
  };

  const meetingIdToDelete = state.meeting_id;
  const handleDeleteMeeting = async () => {
    const response = await deleteMeeting(meetingIdToDelete);
    navigate("/");
  };

  return (
    <div>
      <Card className="cardParent">
        <div className="inviteMembersButton">
          {/* <Button variant="contained" onClick={() => setMemberModalOpen(true)}>
            Add Member
          </Button>
          <AddMemberModal
            isOpen={isMemberModalOpen}
            onClose={() => setMemberModalOpen(false)}
            onSave={handleMemberSave}
          /> */}
          {/* <Button variant="contained" color="primary">
            Invite Members
          </Button> */}
        </div>

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
                  value={dayjs(`2022-04-17T${meetingStart}`).toDate()}
                  onChange={(date) => handleStartTimeChange(date)}
                />

                <TimePicker
                  className="timePicker"
                  type="time"
                  label="Meeting End"
                  value={dayjs(`2022-04-17T${meetingEnd}`).toDate()}
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
          {/* <div className="button-group">
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
            />
          </div> */}
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
