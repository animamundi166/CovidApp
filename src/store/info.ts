import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import getCountryInfo, { ICountryInfo } from "../api/getCountryInfo";

export const getInfo = createAsyncThunk('getInfo', (countryCode: string) => {
  return getCountryInfo(countryCode!);
});

interface IInfoState {
  countryInfo: ICountryInfo[] | null;
}

const initialState: IInfoState = {
  countryInfo: null,
};

const infoReducer = createReducer(initialState, (builder) => {
  builder.addCase(getInfo.fulfilled, (state, action) => {
    state.countryInfo = action.payload;
  });
});

export default infoReducer;
