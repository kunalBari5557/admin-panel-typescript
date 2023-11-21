import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const ViewProductDetails = () => {
  const location = useLocation();
  const stateData = location.state;

  return (
    <TableContainer style={{marginTop:"5rem"}} component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>{stateData.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
            <TableCell>{stateData.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewProductDetails;
