let navigator = null;
let dispatcher = null;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (to, options) => {
  if (navigator) navigator(to, options);
};

export const setDispatcher = (dispatch) => {
  dispatcher = dispatch;
};

export const getDispatcher = () => dispatcher;