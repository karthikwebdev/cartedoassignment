const getUserState = () => {
  if (localStorage.getItem("token")) {
    try {
      return JSON.parse(
        window.atob(localStorage.getItem("token").split(".")[1])
      );
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

const initialState = getUserState();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
};

export default userReducer;
