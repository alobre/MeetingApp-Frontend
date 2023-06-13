/*
TODO:
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
import { useLocation } from "react-router-dom";
import AddMemberModal from "components/AddMember";
import { useNavigate, Navigate } from "react-router-dom";

import { AvatarGroup } from '@mui/material';
import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';


const MeetingDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [meetingTime, setMeetingTime] = useState(state.startTime);
  const [meetingDate, setMeetingDate] = useState(state.date);
  const [meetingPlace, setMeetingPlace] = useState(state.meetingPlace);
  const [actionPoints, setActionPoints] = useState(state.actionPoints);
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [members, setMembers] = useState([]);






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
      members,
    };
    navigate("/ViewAgenda", { state: { agenda } }); // Pass the agenda object in the state

    console.log(agenda, { state });
  };

  const handleMemberSave = (selectedMembers) => {
    setMembers(selectedMembers);
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
            {members.map((member, index) => (
              <li key={index}>      <Avatar alt="Amelie" src="/static/images/avatar/2.jpg" sx={{ width: 42, height: 42 }}/>   {member.name}</li>
            // <li >
            // <div class="avatar-container">
            
            //     <span class="hover-letter">A</span>
            //   </div>

            // </li>

            ))}
          </ul>
        )}
        {!isDropdownOpen && (
          <p>
            {members.map((member, index) => (
              <span key={index}>
                {member.name}
                {index !== members.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}
      </Card>
    );
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
          <div className="meetingDetailsContainer">
            <TextField
              type="time"
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
          </div> 
          <div className="memberListContainer">
            <MemberList members={members} />
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
              {actionPoints.map((actionPoint, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
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

        <div className="button-container">
          <div className="button-group">
            <Button variant="contained" onClick={handleAddActionPoint}>
              Add Action Point
            </Button>
          </div>
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
            <Button variant="contained">save agenda</Button>
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
