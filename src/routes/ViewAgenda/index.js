import React, { useState } from "react";
import Card from "@mui/material/Card";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Modal,
} from "@mui/material";
import "./style.css";
import MemberList from "components/MemberList";

const ViewAgenda = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location.state:", location.state);
  const agenda = location.state?.agenda;
  console.log("agenda:", agenda);
  const [isModalOpen, setModalOpen] = useState(false);
  const [membersToShow, setMembersToShow] = useState(3);

  if (!agenda) {
    return <div>No agenda found.</div>;
  }

  const navigateToWriteProtocol = (agenda) => {
    navigate("/WriteProtocol", { state: { agenda: agenda } });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showAllMembers = () => {
    setMembersToShow(agenda.members.length);
    openModal();
  };

  const showFirstFiveMembers = () => {
    setMembersToShow(5);
    openModal();
  };

  return (
    <div>
      {/* <Card className="card-container">
        <Typography variant="h5" className="members">
          Members
        </Typography>
        <List>
          {agenda.members.slice(0, 3).map((member, index) => (
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
        members={agenda.members}
      /> */}
      <Card className="card-container">
        <Typography variant="h2">Agenda Details</Typography>
        <Button
          variant="outlined"
          className="protocol"
          onClick={() => navigateToWriteProtocol(agenda)}
        >
          Start a protocol
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

              <TableCell>
                {/* <Card className="card-members"> */}
                <Typography variant="h5" className="members">
                  Members
                </Typography>
                <List>
                  {agenda.members.slice(0, 3).map((member, index) => (
                    <ListItem key={index}>{member.name}</ListItem>
                  ))}
                </List>
                <Button variant="outlined" onClick={showAllMembers}>
                  Show All Members
                </Button>
                {/* </Card> */}

                <MemberList
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  members={agenda.members}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Typography variant="h5" className="members">
          Members
        </Typography>
        <List>
          {agenda.members.map((member, index) => (
            <ListItem key={index}>{member.name}</ListItem>
          ))}
        </List>{" "} */}
      </Card>
    </div>
  );
};

export default ViewAgenda;
