import { login, logout, register, getCurrentUser } from "@/api/auth.api";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk('registerUser', register)
export const loginUser = createAsyncThunk('loginUser', login)
export const logoutUser = createAsyncThunk('logoutUser', logout)
export const getUser = createAsyncThunk('getUser', getCurrentUser)

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null,
  },
  reducers:{},
  extraReducers: (builder) => {
    //Register
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.error = null;
    });

    //Login
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.error = null;
    });

    //Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    }); 

    //Get Current User
    builder.addCase(getUser.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.error = null;
    });
  }
});

export default authenticationSlice.reducer