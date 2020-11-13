import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";
import teamMembersReducer from "./teamMembers";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  teamMembers: teamMembersReducer,
});
