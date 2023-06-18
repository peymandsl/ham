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
  // eventTypeFilter: [
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
  eventTypeFilter: [],
  hardShipFilter: 2,
  eventSorted: "newest",
  provienceFilter: 0,
  lastSecondFilter: false,
};

export const eventSlice = createSlice({
  name: "registerEvent",
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
    eventPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    eventTypeFilter: (state, action) => {
      state.eventTypeFilter = action.payload;
    },
    eventHardShipFilter: (state, action) => {
      state.hardShipFilter = action.payload;
    },
    eventSort: (state, action) => {
      state.eventSorted = action.payload;
    },
    eventProvienceFilter: (state, action) => {
      state.provienceFilter = action.payload;
    },
    lastSecondFilter: (state, action) => {
      state.lastSecondFilter = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getEvents,
  eventSort,
  getUserInfo,
  eventTypeFilter,
  activeFavorite,
  eventPriceFilter,
  lastSecondFilter,
  selectedEventInfo,
  eventHardShipFilter,
  eventProvienceFilter,
} = eventSlice.actions;

export default eventSlice.reducer;
