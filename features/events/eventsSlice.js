import { createSlice } from "@reduxjs/toolkit";
import { getEvent } from "../../api/firebaseAPI";

const initialState = {
  myEvents: {},
  events: {},
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setMyEvents: (_state, { payload }) => {
      state.myEvents = payload;
    },
    addEvent: (state, { payload }) => {
      state.events[payload.id] = payload;
    },
    addMyEvent: (state, { payload }) => {
      state.myEvents[payload.id] = payload;
    },
  },
});

export const { addEvent, addMyEvent } = eventsSlice.actions;
export default eventsSlice.reducer;

export const fetchEvent = (id) => async (dispatch) => {
  try {
    const event = await getEvent(id);
    if (event.participants.includes("Tobias")) dispatch(addMyEvent(event));
    else dispatch(addEvent(event));
  } catch (err) {
    console.log(err);
  }
};
