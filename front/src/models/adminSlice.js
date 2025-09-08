import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../client';


// Fetch admin onboarding fields
export const fetchAdmin = createAsyncThunk(
  'admin/fetchAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const result = await client.get('/admin/get-onboarding');
      return result.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Save admin onboarding fields
export const saveAdminFields = createAsyncThunk(
  'admin/saveAdminFields',
  async ({ fields }, { rejectWithValue }) => {
    try {
      await client.put('/admin/save-onboarding', {fields} );
      return fields; // return saved fields to update Redux state
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    fields:{
    about_me: { title: 'About Me', step: 2 },
    birthday: { title: 'Birthday', step: 3 },
    address: { title: 'Address', step: 2 },
    },
    status: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAdmin
      .addCase(fetchAdmin.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state,{fields:action.payload.fields})
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.status = 'failed';
      })

      // saveAdminFields
      .addCase(saveAdminFields.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(saveAdminFields.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state,{fields:action.payload})
      })
      .addCase(saveAdminFields.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default adminSlice.reducer;
