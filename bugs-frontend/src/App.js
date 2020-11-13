import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Bugs from "./components/Bugs.jsx";
import BugsList from "./components/BugsList.jsx";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Bugs />
    </Provider>
  );
}

export default App;
