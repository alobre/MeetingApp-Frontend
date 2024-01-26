/*

This component is a table in which all the meetings are presented to the user

*/

import React, { memo, useState } from "react";
import style from "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router";
import { useNavigate } from "react-router-dom";
import { hasRightToEdit } from "components/AxiosInterceptor/AxiosInterceptor";

const MeetingTable = ({ data }) => {
  const navigate = useNavigate();
  var memberHasRightToEdit;

  // clicking on a table row retreives the meeting id, and based on
  // user credentials, navigates to either editable agenda view,
  // or just the non-editable agenda view

  const handleRowClick = async (body) => {
    const response = await hasRightToEdit(body.meeting_id);
    const memberHasRightToEdit = response.data.rows[0].edit_agenda;
    if (memberHasRightToEdit === true) {
      navigate("/EditAgenda", { state: body });
    } else {
      navigate("/NonEditableViewAgenda", { state: body });
    }
  };

  // Group meetings by type
  const groupedMeetings = data.reduce((groups, meeting) => {
    const { meeting_series_name } = meeting;
    if (!groups[meeting_series_name]) {
      groups[meeting_series_name] = [];
    }
    groups[meeting_series_name].push(meeting);
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
            {Object.entries(groupedMeetings).map(
              ([meeting_series_name, meetings]) => (
                <React.Fragment key={meeting_series_name}>
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                    >
                      {meeting_series_name}
                    </TableCell>
                  </TableRow>
                  {meetings.map((row) => (
                    <TableRow
                      key={row.meeting_id}
                      onClick={() =>
                        handleRowClick({
                          meeting_id: row.meeting_id,
                          agenda_id: row.agenda_id,
                          meeting: row,
                        })
                      }
                    >
                      <TableCell component="th" scope="row" align="center">
                        <div id="DateCell">
                          <Typography variant="h7" component="h3">
                            {new Date(row.date).toLocaleDateString()}{" "}
                          </Typography>
                          <Typography variant="h7" component="h6">
                            {/* {row.time} */}
                            {row.start_time} - {row.end_time}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MeetingTable;
