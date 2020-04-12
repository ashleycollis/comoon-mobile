import { combineReducers } from "redux";
import eventsReducer from "../features/events/eventsSlice";
import authReducer from "../features/auth/authSlice.js";

export default combineReducers({
  events: eventsReducer,
  auth: authReducer,
});
