import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobile: "",
  kyc_id: "",
  userRole: "",
  userData: {},
  last_name: "",
  first_name: "",
  favoriteList: [],
  clubProvienceFilter: 0,
  logInOrRegister: false,
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    authInputMobileNumber: (state, action) => {
      state.mobile = 0 + action.payload;
    },
    getUserInfo: (state, action) => {
      state.userData = action.payload;
    },
    favoriteEventsList: (state, action) => {
      state.favoriteList = action.payload;
    },
    clubProvienceFilter: (state, action) => {
      state.clubProvienceFilter = action.payload;
    },
    logInOrRegister: (state, action) => {
      state.logInOrRegister = action.payload;
    },
    kyc_id: (state, action) => {
      state.kyc_id = action.payload;
    },
    userRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  kyc_id,
  userRole,
  getUserInfo,
  logInOrRegister,
  favoriteEventsList,
  clubProvienceFilter,
  authInputMobileNumber,
} = userSlice.actions;

export default userSlice.reducer;
