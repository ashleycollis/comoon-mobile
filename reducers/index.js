import { combineReducers } from "redux";
import eventsReducer from "../features/events/eventsSlice";

export default combineReducers({
  events: eventsReducer,
});
