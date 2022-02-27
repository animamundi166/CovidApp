import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import getSummary, { IBaseGetSummary } from "../api/getSummary";

export const getAllCountries = createAsyncThunk('getSummary', () => {
  return getSummary();
});

interface ICountriesState {
  countries: IBaseGetSummary | null;
}

const initialState: ICountriesState = {
  countries: null,
};

const countriesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getAllCountries.fulfilled, (state, action) => {
    state.countries = action.payload;
  });
  builder.addCase(getAllCountries.rejected, (state) => {
    state.countries = null;
  });
});

export default countriesReducer;
