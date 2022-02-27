import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./info";
import countriesReducer from "./summary";

export const store = configureStore({
  reducer: {
    allCountries: countriesReducer,
    сountryInfo: infoReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
