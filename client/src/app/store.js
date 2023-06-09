import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import towReducer from "../features/tows/towSlice";
import userReducer from "../features/users/userSlice";
import mechanicReducer from "../features/mechanics/mechanicSlice";
import emergencyReducer from "../features/emergencies/emergencySlice";
import reportReducer from "../features/reports/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tow: towReducer,
    user: userReducer,
    mechanic: mechanicReducer,
    emergency: emergencyReducer,
    report: reportReducer,
  },
});
