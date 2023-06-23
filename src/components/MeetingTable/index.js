import React, { useState } from "react";
import style from "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router";
import { useNavigate } from "react-router-dom";

const MeetingTable = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (data) => {
    navigate("/EditAgenda", { state: data });
  };

  // Group meetings by type
  const groupedMeetings = data.reduce((groups, meeting) => {
    const { meetingType } = meeting;
    if (!groups[meetingType]) {
      groups[meetingType] = [];
    }
    groups[meetingType].push(meeting);
    return groups;
  }, {});

  return (
    <div id="tableParent">
      <TableContainer id="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupedMeetings).map(([meetingType, meetings]) => (
              <React.Fragment key={meetingType}>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                  >
                    {meetingType}
                  </TableCell>
                </TableRow>
                {meetings.map((row) => (
                  <TableRow key={row.date} onClick={() => handleRowClick(row)}>
                    <TableCell component="th" scope="row" align="center">
                      <div id="DateCell">
                        <Typography variant="h7" component="h3">
                          {row.date}
                        </Typography>
                        <Typography variant="h7" component="h6">
                          {row.startTime} - {row.endTime}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MeetingTable;
