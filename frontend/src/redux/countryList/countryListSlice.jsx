import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = import.meta.env.VITE_API_URL;

export const fetchVisited = createAsyncThunk(
  'collection/fetchVisited',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(`${API}/auth/visited`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      return data.visited || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchWishlist = createAsyncThunk(
  'collection/fetchWishlist',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(`${API}/auth/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      return data.wishlist || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addVisited = createAsyncThunk(
  'collection/addVisited',
  async (name, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(`${API}/auth/visited`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      return data.visited || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeVisited = createAsyncThunk(
  'collection/removeVisited',
  async (name, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(`${API}/auth/visited`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      return data.visited || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addWishlist = createAsyncThunk(
  'collection/addWishlist',
  async (name, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(`${API}/auth/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      return data.wishlist || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeWishlist = createAsyncThunk(
  'collection/removeWishlist',
  async (name, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(`${API}/auth/wishlist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      return data.wishlist || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    visited: [],
    wishlist: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchVisited.fulfilled, (state, action) => {
        state.visited = action.payload;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(addVisited.fulfilled, (state, action) => {
        state.visited = action.payload;
      })
      .addCase(removeVisited.fulfilled, (state, action) => {
        state.visited = action.payload;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('collection/') &&
          action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('collection/') &&
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('collection/') &&
          action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
        }
      ),
});

export default collectionSlice.reducer;
