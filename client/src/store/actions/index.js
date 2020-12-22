export const actionLogin = (user) => {
  return {
    type: "LOGIN",
    payload: user,
  };
};

export const actionLogout = () => {
  return {
    type: "LOGOUT",
  };
};
