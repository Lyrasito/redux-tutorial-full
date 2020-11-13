const func = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") {
    action(dispatch, getState);
  } else {
    next(action);
  }
};

export default func;

//redux-toolkit has a built-in middleware called thunk that serves this purpose. If you're not using redux-toolkit you can also install redux-thunk and insert it as a middleware
