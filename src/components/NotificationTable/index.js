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
import { useNavigate, Navigate } from "react-router-dom";

const NotificationTable = ({ data }) => {
  const navigate = useNavigate();


  return (
    <div id="tableParent">
      <TableContainer id="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Notification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.date}
              >
                <TableCell component="th" scope="row" align="center">
                <Typography variant="h7" component="h3">
                      {row.date}
                    </Typography>
                    <Typography variant="h7" component="h6">
                      {row.time} 
                    </Typography>
                </TableCell>
                <TableCell>{row.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default NotificationTable;
