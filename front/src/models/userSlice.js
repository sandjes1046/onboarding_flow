import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../client';


// Fetch user
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await client.get('/user/get-user', { params: { email, password } });
      return {...result.data,email,password};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetch a step
export const fetchStep = createAsyncThunk(
  'user/fetchStep',
  async ({ email, step }, { rejectWithValue }) => {
    try {
      const result = await client.get('/user/get-step', { params: { email, step } });
      return result.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Save user step
export const saveUserStep = createAsyncThunk(
  'user/saveUserStep',
  async ({ email, step, answers,complete }, { rejectWithValue }) => {
    try {
      const result = await client.put('/user/save-step', { email, step,answers:{...answers,step,complete,birthday:answers.birthday ? answers.birthday : null} });
      return { email, step, answers };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initUser = {
    step: 0,
    complete: false,
    fields: {},
    email: '',
    password: '',
    birthday: '',
    about_me: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    status: 'idle',
  }

const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    setStep: (state, action) => {
     // delete action.payload?.answers?.step
      Object.assign(state, action.payload.answers,action.payload);
    },
    clearUser: (state, action) => {
      return initUser
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => { console.log('fetchUser: pending'); state.status = 'pending'})
      .addCase(fetchUser.fulfilled, (state, action) => { console.log('fetchUser: success'); state.status = 'completed' ;Object.assign(state, action.payload); })
      .addCase(fetchUser.rejected, (state, action) => { console.log('fetchUser Error: ',action.payload); state.status = 'failed' })
      
      // fetchStep
      .addCase(fetchStep.pending, (state) => { console.log('fetchStep: Pending');state.status = 'pending' })
      .addCase(fetchStep.fulfilled, (state, action) => {;state.status = 'completed';Object.assign(state, action.payload.answers, action.payload); })
      .addCase(fetchStep.rejected, (state, action) => { console.log('fetchStep Error: ',action.payload);state.status = 'failed'  })

      // saveUserStep
      .addCase(saveUserStep.pending, (state) => { console.log('saveUserStep: pending');state.status = 'pending' })
      .addCase(saveUserStep.fulfilled, (state, action) => {Object.assign(state, action.payload); state.status = 'completed'})
      .addCase(saveUserStep.rejected, (state, action) => { console.log('saveUserStep Error: ',action.payload);state.status = 'failed'  });
  }
});

export const { setStep,clearUser } = userSlice.actions;
export default userSlice.reducer;
