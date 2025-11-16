import { createSlice } from "@reduxjs/toolkit";
import researchsData from "../../../data/data.js";

const initialHeadTitles = researchsData.map((section) => section.headTitle);

const researchSlice = createSlice({
  name: "researchHeadTitles",
  initialState: {
    headTitles: initialHeadTitles,
  },
  reducers: {
    // Sonra eklenilecek
  },
});

export default researchSlice.reducer;
