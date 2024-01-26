/*

This component is a table that contains all the notifications for
the user.

*/

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { hasRightToEdit } from "components/AxiosInterceptor/AxiosInterceptor";

const NotificationTable = ({ data }) => {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return <Typography>No notifications found.</Typography>;
  }

  var memberHasRightToEdit;

  // clicking on a table row, based on
  // user credentials, navigates to either editable agenda view,
  // or just the non-editable agenda view

  const handleRowClick = async (body) => {
    const response = await hasRightToEdit(body.meeting_id);
    memberHasRightToEdit = response.data.rows[0].edit_agenda;
    if (memberHasRightToEdit === true) {
      navigate("/EditAgenda", { state: body });
    } else {
      navigate("/NonEditableViewAgenda", { state: body });
    }
  };

  return (
    <div id="tableParent">
      <TableContainer id="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Notification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((notification) => (
              <TableRow
                key={notification.meeting_id}
                onClick={() =>
                  handleRowClick({
                    meeting_id: notification.meeting_id,
                    agenda_id: notification.agenda_id,
                    meeting: notification,
                  })
                }
              >
                <TableCell>
                  {new Date(notification.date).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>{notification.start_time}</TableCell>
                <TableCell>
                  {notification.edit_agenda
                    ? `You are invited to the meeting "${notification.title}". Feel free to edit the agenda.`
                    : `You are invited to meeting "${notification.title}".`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NotificationTable;
