import { LOGIN_USER, LOGOUT_USER, UPDATE_CART_COUNT } from "./userActions";

const initialState = {
  user: null,
  cartCount: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    case UPDATE_CART_COUNT:
      return {
        ...state,
        cartCount: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
