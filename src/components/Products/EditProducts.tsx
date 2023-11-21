import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProductById } from "../../redux/features/Products/Products";
import { ProductUpdateSchema } from "../../ValidationSchema";
import { Button, Grid, TextField } from "@mui/material";

interface ProductData {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: number;
}

const EditProducts: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const stateData = location.state as ProductData;
  const Navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const productsEdit = useFormik({
    initialValues: {
      id: stateData.id,
      title: stateData.title,
      price: stateData.price,
      description: stateData.description,
      category: stateData.category,
      image: stateData.image,
      rating: stateData.rating,
    },
    enableReinitialize: true,
    validationSchema: ProductUpdateSchema,

    onSubmit: (values) => {
      dispatch(updateProductById({ productId: stateData.id, updatedProduct: values }))
        .then(() => {
          Navigate("/Products", { state: "Product updated successfully" });
        })
        .catch((error:any) => {
          toast.error(error.message);
        });
    },
  });

  return (
    <div style={{ marginTop: "5rem" }}>
      <form onSubmit={productsEdit.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={productsEdit.values.title}
              onChange={productsEdit.handleChange}
              error={productsEdit.touched.title && Boolean(productsEdit.errors.title)}
              helperText={productsEdit.touched.title && productsEdit.errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="price"
              label="Price"
              value={productsEdit.values.price}
              onChange={productsEdit.handleChange}
              error={productsEdit.touched.price && Boolean(productsEdit.errors.price)}
              helperText={productsEdit.touched.price && productsEdit.errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              value={productsEdit.values.description}
              onChange={productsEdit.handleChange}
              error={productsEdit.touched.description && Boolean(productsEdit.errors.description)}
              helperText={productsEdit.touched.description && productsEdit.errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="category"
              label="Category"
              value={productsEdit.values.category}
              onChange={productsEdit.handleChange}
              error={productsEdit.touched.category && Boolean(productsEdit.errors.category)}
              helperText={productsEdit.touched.category && productsEdit.errors.category}
            />
          </Grid>
          {/* Add other fields as needed */}
        </Grid>

        <Button sx={{ marginTop: "1rem" }} type="submit" color="primary" variant="contained">
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default EditProducts;
