import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import coursSlice from "../features/coursSlice";
import eventSlice from "../features/eventSlice";

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
    registerEvent: eventSlice,
    coursInfo: coursSlice,
  },
});
