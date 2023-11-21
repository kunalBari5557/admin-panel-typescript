import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSchema } from "../../ValidationSchema";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { createUser } from "../../redux/features/Users/Users";

interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
    email: "",
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
    },
    name: {
      firstname: "",
      lastname: "",
    },
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const user = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: UserSchema,

    onSubmit: (values) => {
      setIsSubmitting(true);
      let formData: any = new FormData();
      formData.append("name.firstname", values.name.firstname);
      formData.append("name.lastname", values.name.lastname);

      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("email", values.email);
      formData.append("phone", values.phone);

      formData.append("address.city", values.address.city);
      formData.append("address.street", values.address.street);
      formData.append("address.number", values.address.number);
      formData.append("address.zipcode", values.address.zipcode);

      dispatch(createUser(formData))
        .then((result: any) => {
          if (createUser.fulfilled.match(result)) {
            Navigate("/Users");
            setIsSubmitting(false);
            user.resetForm();
          }
        })
        .catch((error: any) => {
          setResponse(error.response?.data.msg || "An error occurred");
          setIsSubmitting(false);
        });
    },
  });

  return (
    <div style={{ marginTop: "5rem" }}>
      <form onSubmit={user.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name.firstname"
              label="Firstname"
              value={user.values?.name?.firstname}
              onChange={user.handleChange}
              error={
                user.touched?.name?.firstname &&
                Boolean(user.errors?.name?.firstname)
              }
              helperText={
                user.touched?.name?.firstname && user.errors?.name?.firstname
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name.lastname"
              label="Lastname"
              value={user.values?.name?.lastname}
              onChange={user.handleChange}
              error={
                user.touched?.name?.lastname &&
                Boolean(user.errors?.name?.lastname)
              }
              helperText={
                user.touched?.name?.lastname && user.errors?.name?.lastname
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={user.values.username}
              onChange={user.handleChange}
              error={user.touched.username && Boolean(user.errors.username)}
              helperText={user.touched.username && user.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              value={user.values.password}
              onChange={user.handleChange}
              error={user.touched.password && Boolean(user.errors.password)}
              helperText={user.touched.password && user.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={user.values.email}
              onChange={user.handleChange}
              error={user.touched.email && Boolean(user.errors.email)}
              helperText={user.touched.email && user.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="phone"
              label="Phone"
              value={user.values.phone}
              onChange={user.handleChange}
              error={user.touched.phone && Boolean(user.errors.phone)}
              helperText={user.touched.phone && user.errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address.city"
              label="City"
              value={user.values?.address?.city}
              onChange={user.handleChange}
              error={
                user.touched?.address?.city &&
                Boolean(user.errors?.address?.city)
              }
              helperText={
                user.touched?.address?.city && user.errors?.address?.city
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address.street"
              label="Street"
              value={user.values?.address?.street}
              onChange={user.handleChange}
              error={
                user.touched?.address?.street &&
                Boolean(user.errors?.address?.street)
              }
              helperText={
                user.touched?.address?.street && user.errors?.address?.street
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address.number"
              label="Number"
              value={user.values?.address?.number}
              onChange={user.handleChange}
              error={
                user.touched?.address?.number &&
                Boolean(user.errors?.address?.number)
              }
              helperText={
                user.touched?.address?.number && user.errors?.address?.number
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address.zipcode"
              label="Zipcode"
              value={user.values?.address?.zipcode}
              onChange={user.handleChange}
              error={
                user.touched?.address?.zipcode &&
                Boolean(user.errors?.address?.zipcode)
              }
              helperText={
                user.touched?.address?.zipcode && user.errors?.address?.zipcode
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
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
