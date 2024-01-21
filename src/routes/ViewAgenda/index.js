import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { getAgenda } from "components/AxiosInterceptor/AxiosInterceptor";
import "./style.css";
import MemberList from "components/MemberList";

const ViewAgenda = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const agenda_id = location.state?.agenda.id;
  const [agenda, setAgenda] = useState(null);

  useEffect(() => {
    const fetchAgendaDetails = async () => {
      try {
        const response = await getAgenda(agenda_id);

        setAgenda(response);
        console.log(JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching agenda details", error);
      }
    };

    fetchAgendaDetails();
  }, [agenda_id]);

  // agenda.actionPoints.sort((a, b) => a.action_point_id - b.action_point_id);

  if (!agenda) {
    return <div>Loading...</div>;
  } else {
    agenda.actionPoints.sort((a, b) => a.action_point_id - b.action_point_id);
  }

  const navigateToWriteProtocol = (agenda) => {
    navigate("/WriteProtocol", { state: { agenda: agenda } });
  };

  return (
    <div>
      <Card className="card-container">
        <Button
          variant="outlined"
          className="protocol"
          onClick={() => navigateToWriteProtocol(agenda)}
        >
          Start a protocol
        </Button>
        <Typography variant="h2">Meeting Details</Typography>
        <Typography variant="h5">{agenda.meeting.title}</Typography>
        <Typography variant="body1">
          Date: {new Date(agenda.meeting.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          Location: {agenda.meeting.address}, {agenda.meeting.building},{" "}
          {agenda.meeting.room}
        </Typography>
        <Typography variant="h5" className="members">
          Meeting Members
        </Typography>
        <List>
          {agenda.meetingMembers.map((member, index) => (
            <ListItem key={index}>
              {member.first_name} {member.last_name} {member.email}
            </ListItem>
          ))}
        </List>
        <Typography variant="h5" className="agenda-items-header">
          Action Points
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item No.</TableCell>
                <TableCell>Action Point</TableCell>
                <TableCell>Sub-Points</TableCell>
                <TableCell>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agenda.actionPoints.map((actionPoint, index) => (
                <TableRow key={actionPoint.action_point_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{actionPoint.text}</TableCell>
                  <TableCell>
                    <List>
                      {actionPoint.subpoints &&
                        actionPoint.subpoints.map((subPoint, subIndex) => (
                          <ListItem key={subPoint.action_point_subpoint_id}>
                            {subPoint.message}
                          </ListItem>
                        ))}
                    </List>
                  </TableCell>
                  <TableCell>
                    <List>
                      {actionPoint.comments &&
                        actionPoint.comments.map((comment, commentIndex) => (
                          <ListItem key={comment.action_point_comment_id}>
                            {comment.comment_text}
                          </ListItem>
                        ))}
                    </List>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ViewAgenda;
