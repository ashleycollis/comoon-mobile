import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attending: [],
  organizing: []
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setAttending: (_state, { payload }) => {
      state.attending = payload;
    }
    //   setRoutes: (state, { payload }) => {
    //     state.list = payload;
    //     state.currentIndex = 0;
    //   },
    //   setCurrentIndex: (state, { payload }) => {
    //     state.currentIndex = payload;
    //   },
    //   clearRoutes: () => initialState,
    //   toggleWaiting: state => {
    //     state.waiting = !state.waiting;
    //   }
  }
});

export const { setAttending } = eventsSlice.actions;
export default eventsSlice.reducer;

// export const fetchRoutes = () => async (dispatch, getState) => {
//   dispatch(clearRoutes());
//   const { location, destination, interests } = getState();
//   try {
//     dispatch(toggleWaiting());
//     const routesInfo = await getRoutesInfo(location, destination, interests);
//     const routes = await Promise.all(
//       routesInfo.map(async ({ routeName, route, spots }) => {
//         const directions = await getDirections(route);
//         return {
//           routeName,
//           spots,
//           ...directions
//         };
//       })
//     );

//     dispatch(toggleWaiting());
//     dispatch(setRoutes(routes));
//   } catch (err) {
//     console.error(err.toString());
//   }
// };
