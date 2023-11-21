import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserById } from "../../redux/features/Users/Users";
import { UserUpdateSchema } from "../../ValidationSchema";
import { Button, Grid, TextField } from "@mui/material";

const EditUser: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const stateData = location.state;

  const Navigate = useNavigate();

  const usersEdit = useFormik({
    initialValues: {
      id: stateData.id,
      email: stateData.email,
      phone: stateData.phone,
      password: stateData.password,
      username: stateData.username,
      name: {
        firstname: stateData?.name?.firstname || "",
        lastname: stateData?.name?.lastname || "",
      },
      address: {
        city: stateData?.address?.city || "",
        street: stateData?.address?.street || "",
        number: stateData?.address?.number || "",
        zipcode: stateData?.address?.zipcode || "",
      },
    },
    enableReinitialize: true,
    validationSchema: UserUpdateSchema,

    onSubmit: (values) => {
      dispatch(updateUserById({ userId: stateData.id, updatedUser: values }))
        .then(() => {
          Navigate("/Users", { state: "User updated successfully" });
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    },
  });
  console.log("usersEdit", usersEdit);

  return (
    <div style={{ marginTop: "5rem" }}>
      <form onSubmit={usersEdit.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name.firstname"
              label="Firstname"
              value={usersEdit.values?.name?.firstname}
              onChange={usersEdit.handleChange}
              error={
                usersEdit.touched?.name?.firstname &&
                Boolean(usersEdit.errors?.name?.firstname)
              }
              helperText={
                usersEdit.touched.name?.firstname &&
                (usersEdit.errors?.name?.firstname as React.ReactNode)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name.lastname"
              label="Lastname"
              value={usersEdit.values?.name?.lastname}
              onChange={usersEdit.handleChange}
              error={
                usersEdit.touched?.name?.lastname &&
                Boolean(usersEdit.errors?.name?.lastname)
              }
              helperText={
                usersEdit.touched.name?.lastname &&
                (usersEdit.errors?.name?.lastname as React.ReactNode)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={usersEdit.values.username}
              onChange={usersEdit.handleChange}
              error={
                usersEdit.touched.username && Boolean(usersEdit.errors.username)
              }
              helperText={
                usersEdit.touched.username &&
                (usersEdit.errors?.username as React.ReactNode)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              value={usersEdit.values.password}
              onChange={usersEdit.handleChange}
              error={
                usersEdit.touched.password && Boolean(usersEdit.errors.password)
              }
              helperText={
                usersEdit.touched.password &&
                (usersEdit.errors?.password as React.ReactNode)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={usersEdit.values.email}
              onChange={usersEdit.handleChange}
              error={usersEdit.touched.email && Boolean(usersEdit.errors.email)}
              helperText={
                usersEdit.touched.email &&
                (usersEdit.errors?.email as React.ReactNode)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="phone"
              label="Phone"
              value={usersEdit.values.phone}
              onChange={usersEdit.handleChange}
              error={usersEdit.touched.phone && Boolean(usersEdit.errors.phone)}
              helperText={
                usersEdit.touched.phone &&
                (usersEdit.errors?.phone as React.ReactNode)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address.city"
              label="City"
              value={usersEdit.values?.address?.city}
              onChange={usersEdit.handleChange}
              error={
                usersEdit.touched?.address?.city &&
                Boolean(usersEdit.errors?.address?.city)
              }
              helperText={
                usersEdit.touched.address?.city &&
                (usersEdit.errors?.address?.city as React.ReactNode)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address.street"
              label="Street"
              value={usersEdit.values?.address?.street}
              onChange={usersEdit.handleChange}
              error={
                usersEdit.touched?.address?.street &&
                Boolean(usersEdit.errors?.address?.street)
              }
              helperText={
                usersEdit.touched.address?.street &&
                (usersEdit.errors?.address?.street as React.ReactNode)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address.number"
              label="Number"
              value={usersEdit.values?.address?.number}
              onChange={usersEdit.handleChange}
              error={
                usersEdit.touched?.address?.number &&
                Boolean(usersEdit.errors?.address?.number)
              }
              helperText={
                usersEdit.touched.address?.number &&
                (usersEdit.errors?.address?.number as React.ReactNode)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address.zipcode"
              label="Zipcode"
              value={usersEdit.values?.address?.zipcode}
              onChange={usersEdit.handleChange}
              error={
                usersEdit.touched?.address?.zipcode &&
                Boolean(usersEdit.errors?.address?.zipcode)
              }
              helperText={
                usersEdit.touched.address?.zipcode &&
                (usersEdit.errors?.address?.zipcode as React.ReactNode)
              }
            />
          </Grid>
        </Grid>

        <Button
          sx={{ marginTop: "1rem" }}
          type="submit"
          color="primary"
          variant="contained"
        >
          Update User
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
