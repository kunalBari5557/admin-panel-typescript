import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
}

interface ProductsState {
  users: User[];
  user: User | null;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface CreateProductResponse {
  id: number;
}

export const createUser = createAsyncThunk<CreateProductResponse, User>(
  'users/createProduct',
  async (newProduct) => {
    const response = await axios.post<CreateProductResponse>('https://fakestoreapi.com/users', newProduct);
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk<User[]>('users/fetchProducts', async () => {
  const response = await axios.get<User[]>('https://fakestoreapi.com/users');
  return response.data;
});

export const updateUserById = createAsyncThunk<void, { userId: any; updatedUser: any }>(
  'users/updateProductById',
  async ({ userId, updatedUser }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/users/${userId}`, updatedUser, {
        headers: { token: `${localStorage.getItem('Token')}` },
      });

      if (response.status === 200) {
        return;
      } else {
        return rejectWithValue('Failed to update the user.');
      }
    } catch (error) {
      return rejectWithValue('Failed to update the user.');
    }
  }
);

export const deleteUserById = createAsyncThunk<void, number>(
  'users/deleteProductById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://fakestoreapi.com/users/${userId}`, {
        headers: { token: `${localStorage.getItem('Token')}` },
      });
      if (response.status === 200) {
        return;
      } else {
        return rejectWithValue('Failed to delete user.');
      }
    } catch (error) {
      return rejectWithValue('Failed to delete user.');
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: null,
    loading: 'idle',
    error: null,
  } as ProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to create user.';
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to fetch users.';
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(deleteUserById.fulfilled, (state) => {
        state.loading = 'fulfilled';
        state.error = null;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to delete user.';
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateUserById.fulfilled, (state) => {
        state.loading = 'fulfilled';
        state.error = null;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error?.message || 'Failed to update user.';
      });
  },
});

export default usersSlice.reducer;
