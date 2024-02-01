export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_CART_COUNT = "UPDATE_CART_COUNT";

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const updateCartCount = (count) => {
  return {
    type: UPDATE_CART_COUNT,
    payload: count,
  };
};
