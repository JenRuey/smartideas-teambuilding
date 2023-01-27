import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateAppVersion = createAsyncThunk("update/appversion", async (version: number) => {
  return version;
});
