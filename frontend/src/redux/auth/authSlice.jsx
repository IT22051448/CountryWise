import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const API = import.meta.env.VITE_API_URL;

// Thunk for Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.status === 200) {
        const decoded = jwtDecode(data.token);
        const expiry = decoded.exp * 1000;

        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('token_expiry', expiry.toString());

        return { token: data.token, email: data.email, expiry };
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Server error.');
    }
  }
);

// Thunk for Registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Server error.');
    }
  }
);

const initialState = {
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('email') || null,
  expiry: localStorage.getItem('token_expiry') || null,
  status: 'idle',
  message: '',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
      state.message = '';
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('token_expiry');
    },
    clearMessage(state) {
      state.message = '';
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.message = '';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.expiry = action.payload.expiry.toString();
        state.message = 'Login successful';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = action.payload;
      })
      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.message = '';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = 'Registration successful';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = action.payload;
      });
  },
});

export const { logout, clearMessage } = authSlice.actions;
export default authSlice.reducer;
