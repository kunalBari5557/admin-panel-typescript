import { createSlice, createAsyncThunk, PayloadAction, Action } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface Product {
  id: number;
}

interface ProductsState {
  products: Product[];
  product: Product | null;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface CreateProductResponse {
  id: number;
}

export const createProduct = createAsyncThunk<CreateProductResponse, Product>(
  'products/createProduct',
  async (newProduct) => {
    const response = await axios.post<CreateProductResponse>('https://fakestoreapi.com/products', newProduct);
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
  return response.data;
});

export const updateProductById = createAsyncThunk<void, { productId: any; updatedProduct: any }>(
  'products/updateProductById',
  async ({ productId, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${productId}`, updatedProduct, {
        headers: { token: `${localStorage.getItem('Token')}` },
      });

      if (response.status === 200) {
        return;
      } else {
        return rejectWithValue('Failed to update the product.');
      }
    } catch (error) {
      return rejectWithValue('Failed to update the product.');
    }
  }
);

export const deleteProductById = createAsyncThunk<void, number>(
  'products/deleteProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://fakestoreapi.com/products/${productId}`, {
        headers: { token: `${localStorage.getItem('Token')}` },
      });
      if (response.status === 200) {
        return;
      } else {
        return rejectWithValue('Failed to delete product.');
      }
    } catch (error) {
      return rejectWithValue('Failed to delete product.');
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    loading: 'idle',
    error: null,
  } as ProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to create product.';
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to fetch products.';
      })
      .addCase(deleteProductById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(deleteProductById.fulfilled, (state) => {
        state.loading = 'fulfilled';
        state.error = null;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to delete product.';
      })
      .addCase(updateProductById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateProductById.fulfilled, (state) => {
        state.loading = 'fulfilled';
        state.error = null;
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to update product.';
      });
  },
});

export default productsSlice.reducer;
