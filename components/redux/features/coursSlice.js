import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event_title: "",
  event_price: "",
  event_type: "",
  event_provience: "",
  event_city: "",
  hard_ship: "",
  event_summery: "",
  event_summery_continue: "",
  breakfast_service: "",
  dinner_service: "",
  lunch_service: "",
  mid_meal_service: "",
  club_service_description: "",
  club_services_items: "",
  essential_list: "",
  suggestion_list: "",
  event_days_lenghth: "",
  tavel_start_description: "",
  travel_days: "",
  start_travel_time: "",
  staying_location: "",
  entertainments: "",
  cancellation_rules: "",
  enterance_rules: "",
  cancellation_rules: "",
  event_owner: {},
  event_participants: {},
  register_deadline: "",
  discount_percent: "",
  discount_code: "",
  peak_height: "",
  last_second: "",
  admin_accepted: "",
  event_number: "",
  selectedEvent: {},
  event_capacity: "",
  peak_name: "",
  transfer_type: "",
  favoriteEvents: [],
  events: [],
  priceFilter: 0,
  // coursTypeFilter: [
  //   [
  //     "اسکی",
  //     "کوهنوردی",
  //     "جنگل گردی",
  //     "طبیعتگردی",
  //     "کویر نوردی",
  //     "تنگه نوردی",
  //     "دوچرخه سواری",
  //   ],
  // ],
  coursTypeFilter: [],
  hardShipFilter: 2,
  eventSorted: "newest",
  provienceFilter: 0,
  lastSecondFilter: false,
};

export const coursSlice = createSlice({
  name: "coursInfo",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.userData = action.payload;
    },
    selectedEventInfo: (state, action) => {
      state.selectedEvent = action.payload;
    },
    activeFavorite: (state, action) => {
      state.favoriteEvents = action.payload;
    },
    getEvents: (state, action) => {
      state.events = action.payload;
    },
    coursPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    coursTypeFilter: (state, action) => {
      state.coursTypeFilter = action.payload;
    },
    coursHardshipFilter: (state, action) => {
      state.hardShipFilter = action.payload;
    },
    eventSort: (state, action) => {
      state.eventSorted = action.payload;
    },
    coursProvienceFilter: (state, action) => {
      state.provienceFilter = action.payload;
    },
    coursLastSecondFilter: (state, action) => {
      state.lastSecondFilter = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  //   getEvents,
  //   eventSort,
  //   getUserInfo,
  //   eventTitleStep,
  coursTypeFilter,
  //   activeFavorite,
  //   eventSubmitValue,
  coursPriceFilter,
  coursLastSecondFilter,
  //   selectedEventInfo,
  coursHardshipFilter,
  coursProvienceFilter,
} = coursSlice.actions;

export default coursSlice.reducer;
