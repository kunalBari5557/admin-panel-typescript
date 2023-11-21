import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductSchema } from "../../ValidationSchema";
import { createProduct } from "../../redux/features/Products/Products";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert, AlertTitle, Grid } from "@mui/material";

interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [initialValues, setInitialValues] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null as File | null,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const product = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ProductSchema,

    onSubmit: (values) => {
      setIsSubmitting(true);
      let formData:any = new FormData();
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("category", values.category);
      if (values.image) {
        formData.append("image", values.image);
      }

      dispatch(createProduct(formData))
        .then((result:any) => {
          if (createProduct.fulfilled.match(result)) {
            Navigate("/Products");
            setIsSubmitting(false);
            product.resetForm();
          }
        })
        .catch((error:any) => {
          setResponse(error.response?.data.msg || "An error occurred");
          setIsSubmitting(false);
        });
    },
  });

  return (
    <div style={{ marginTop: "5rem" }}>
      <form onSubmit={product.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={product.values.title}
              onChange={product.handleChange}
              error={product.touched.title && Boolean(product.errors.title)}
              helperText={product.touched.title && product.errors.title}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="price"
              label="Price"
              value={product.values.price}
              onChange={product.handleChange}
              error={product.touched.price && Boolean(product.errors.price)}
              helperText={product.touched.price && product.errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              value={product.values.description}
              onChange={product.handleChange}
              error={
                product.touched.description &&
                Boolean(product.errors.description)
              }
              helperText={
                product.touched.description && product.errors.description
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="category"
              label="Category"
              value={product.values.category}
              onChange={product.handleChange}
              error={
                product.touched.category && Boolean(product.errors.category)
              }
              helperText={product.touched.category && product.errors.category}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
                product.setFieldValue("image", e.target.files && e.target.files[0]);
              }}
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
