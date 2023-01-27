import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateAppVersion } from "../api/AppAPI";

type AppStateType = {
  version: number;
};

const appState: AppStateType = { version: 1.0 };

const appSlice = createSlice({
  name: "app",
  initialState: appState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateAppVersion.fulfilled, (state: AppStateType, action: PayloadAction<number>) => {
      state.version = action.payload;
    });
  },
});

export default appSlice;
