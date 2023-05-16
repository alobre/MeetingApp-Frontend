import React from "react";
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
} from "@mui/material";
import "./style.css";

const ViewAgenda = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location.state:", location.state);
  const agenda = location.state?.agenda;
  console.log("agenda:", agenda);

  if (!agenda) {
    return <div>No agenda found.</div>;
  }

  const navigateToWriteProtocol = (agenda) => {
    navigate("/WriteProtocol", { state: { agenda: agenda } });
  };

  return (
    <div>
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
        <Typography variant="h5" className="members">
          Members
        </Typography>
        <List>
          {agenda.members.map((member, index) => (
            <ListItem key={index}>{member}</ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default ViewAgenda;
