import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  user: any | null; 
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
}

interface Credentials {
  username: string;
  password: string;
}

export const login = createAsyncThunk("auth/login", async (credentials: Credentials) => {
  console.log(process.env.REACT_APP_URL);
  
  const response = await axios.post<{ token: string; user: any }>(
    `${process.env.REACT_APP_URL}/auth/login`,
    credentials
  );
  return response.data;
});

const initialState: AuthState = {
  token: null,
  user: null,
  loading: "idle",
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder:any) => {
    builder
      .addCase(login.pending, (state:any) => {
        state.loading = "pending";
      })
      .addCase(login.fulfilled, (state:any, action: PayloadAction<{ token: string; user: any }>) => {
        state.loading = "fulfilled";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(login.rejected, (state:any, action: PayloadAction<string>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
