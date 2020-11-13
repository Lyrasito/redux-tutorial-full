import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "teamMembers",
  initialState: [],
  reducers: {
    teamMemberAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
        bugs: [],
      });
    },
  },
});

export const { teamMemberAdded } = slice.actions;
export default slice.reducer;
