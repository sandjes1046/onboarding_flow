import { configureStore } from '@reduxjs/toolkit';
import userReducer from './models/userSlice';
import adminReducer from './models/adminSlice'
import dataReducer from './models/dataSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    data: dataReducer
  }
});

export default store;