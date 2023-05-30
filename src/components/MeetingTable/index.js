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

// den data Parameter wird erst beim Home-ScreenÜbergeben.
const MeetingTable = ({ data }) => {
  const navigate = useNavigate();

  // added
  const handleRowClick = (data) => {
    navigate("/EditAgenda", { state: data });
  };

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
            {data.map((row) => (
              <TableRow
                key={row.date}
                // added
                onClick={() => handleRowClick(row)}
                //  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default MeetingTable;
