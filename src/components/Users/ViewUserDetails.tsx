import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const ViewUserDetails = () => {
  const location = useLocation();
  const stateData = location.state;
  console.log("stateData", stateData);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const maskedPassword = "*".repeat(stateData?.password.length);

  return (
    <TableContainer style={{ marginTop: "5rem" }} component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Number</strong>
            </TableCell>
            <TableCell>{stateData?.address?.number}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Zipcode</strong>
            </TableCell>
            <TableCell>{stateData?.address?.zipcode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Username</strong>
            </TableCell>
            <TableCell>{stateData?.username}</TableCell>
          </TableRow>{" "}
          <TableRow>
            <TableCell>
              <strong>Password</strong>
            </TableCell>
            <TableCell>
              {showPassword ? stateData.password : maskedPassword}
              <button style={{marginLeft:"2rem"}} onClick={togglePasswordVisibility}>
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewUserDetails;
