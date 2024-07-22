import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import problemReducer from '../slices/problemSlice';
const rootReducer = combineReducers({
    auth : authReducer,
    user : userReducer,
    problem : problemReducer,
});

export default rootReducer;