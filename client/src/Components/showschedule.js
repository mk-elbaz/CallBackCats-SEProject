import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Showschedule() {
  const classes = useStyles();

  const [schedulesList, setscheduleList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/viewSchedule").then((allschedules) => {
      setscheduleList(allschedules.data);
    });
  }, []);

  return (
    <>
      <h2>Schedule</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell align="right">First</TableCell>
              <TableCell align="right">Second</TableCell>
              <TableCell align="right">Third</TableCell>
              <TableCell align="right">Fourth</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedulesList.map((schedule, key) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {schedule.day}
                </TableCell>
                <TableCell align="right">{schedule.first}</TableCell>
                <TableCell align="right">{schedule.second}</TableCell>
                <TableCell align="right">{schedule.third}</TableCell>
                <TableCell align="right">{schedule.fourth}</TableCell>
                <TableCell align="right">
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
