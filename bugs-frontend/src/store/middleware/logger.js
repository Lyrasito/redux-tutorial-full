const logger = (param) => (store) => (next) => (action) => {
  // console.log("param", param);
  // console.log("store", store);
  // console.log("next", next);
  //  console.log("action", action);
  next(action);
};
//put "param" as the first parameter to pass a custom parameter to the middleware when you insert it into the store configurer
export default logger;
