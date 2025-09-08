import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../client';

// Async thunk to fetch data
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const result = await client.get('/data/get-data'); // adjust your endpoint
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    users: [],
    admin: [],
    status: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // merge payload into state (expecting { users: [], admin: [] })
        state.users = action.payload.users || [];
        state.admin = action.payload.admin || [];
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default dataSlice.reducer;
