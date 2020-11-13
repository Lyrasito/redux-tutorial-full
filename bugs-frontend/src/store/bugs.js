//import * as actions from "./actiontypes";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
      bugs.lastFetch = Date.now();
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      let index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssigned: (bugs, action) => {
      console.log("payload:", action.payload);
      const { id: bugId, userId } = action.payload;
      console.log(action.payload.id, action.payload.userId);
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      console.log(index);
      bugs.list[index].userId = userId;
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
  },
});

//selector function
export const unresolvedBugsSelector = (state) =>
  state.entities.bugs.filter((bug) => !bug.resolved);

export const getUnresolvedBugs = createSelector(
  (state) => {
    console.log(state);
    return state.entities.bugs.list;
  },
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsForTeamUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs.list,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
//^^^ output of first two arguments(state.entities.bugs, state.entities.projects) become arguments of callback function in 3rd argument

const {
  bugAdded,
  bugResolved,
  bugAssigned,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

//Action Creator
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  console.log(getState());
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) {
    return;
  }

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: { userId },
    onSuccess: bugAssigned.type,
  });

/*
//Defining action functions:
export const bugAdded = createAction("bugAdded");

export const bugRemoved = createAction("bugRemoved");

export const bugResolved = createAction("bugResolved");
*/

//Defining reducer:

/*
const reducer = createReducer([], {
  //action: function that handles action
  //callback function uses immer under the hood to create a copy of the original state, and mutate it with this mutating code
  //the name of the cases(actions?) must be the same as the strings passed to the createAction function
  [bugAdded.type]: (state, action) => {
    state.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },
  [bugResolved.type]: (state, action) => {
    let index = state.findIndex((bug) => bug.id === action.payload.id);
    state[index].resolved = true;
  },
});

export default reducer;
*/
/*
export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);
    case bugResolved.type:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );
    default:
      return state;
  }
}
*/
