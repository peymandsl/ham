import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

function createData(
  full_name,
  national_id,
  mobile,
  emergency_tell,
  payment_price
) {
  return { full_name, national_id, mobile, emergency_tell, payment_price };
}

export default function ListTable({ event }) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      event &&
        event.event_participants.map((item) =>
          createData(
            item.participant.first_name + " " + item.participant.last_name,
            item.participant.national_id,
            item.participant.mobile,
            item.participant.emergency_tell,
            item.payment_price
          )
        )
    );
  }, []);

  return (
    <Box style={{ marginLeft: "15px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>نام و نام خانوادگی</TableCell>
              <TableCell align="center">کد ملی</TableCell>
              <TableCell align="center">شماره همراه</TableCell>
              <TableCell align="center">شماره اضطراری</TableCell>
              <TableCell align="center">مبلغ پرداختی</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.full_name}
                </TableCell>
                <TableCell align="center">{row.national_id}</TableCell>
                <TableCell align="center">{row.mobile}</TableCell>
                <TableCell align="center">{row.emergency_tell}</TableCell>
                <TableCell align="center">{row.payment_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
