import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineVisibility } from "react-icons/md";
// import { deleteProductById,fetchProducts } from "../../redux/features/Products/Products";
import { deleteUserById,fetchUsers } from "../../redux/features/Users/Users";

const Users: React.FC = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const users = useSelector((state: any) => state?.usersState?.users);  

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  //user details
  const HandleShow = (e: any) => {
    Navigate("/users/details", { state: e });
  };

  //edit user
  const HandleAdd = () => {
    Navigate("/users/add");
  };

  //edit user
  const HandleEdit = (e: any) => {
    Navigate("/users/edit", { state: e });
  };

  //delete user
  const HandleDelete = (userId: any) => {
    Swal.fire({
      title: "Do you want to Delete this Record?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#DC3741",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed === true) {
        dispatch(deleteUserById(userId))
          .then((res:any) => {
            if (res?.meta?.requestStatus === "fulfilled") {
              Swal.fire({
                title: "Deleted Successfully.",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          })
          .catch((err:any) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <Paper sx={{ marginTop: "5rem" }}>
      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          onClick={() => HandleAdd()}
          type="submit"
          color="primary"
          variant="contained"
        >
          Add User
        </Button>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Sr. No.</strong>
            </TableCell>
            <TableCell>
              <strong>User Name</strong>
            </TableCell>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell>
              <strong>Phone</strong>
            </TableCell>
            <TableCell>
              <strong>City</strong>
            </TableCell>
            <TableCell>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user:any, index:any) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{`${user?.name?.firstname} ${user?.name?.lastname}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user?.address?.city}</TableCell>
              <TableCell>
                <IconButton onClick={() => HandleShow(user)}>
                  <MdOutlineVisibility />
                </IconButton>
                <IconButton onClick={() => HandleEdit(user)}>
                  <FiEdit />
                </IconButton>
                <IconButton onClick={() => HandleDelete(user.id)}>
                  <AiFillDelete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Users;
