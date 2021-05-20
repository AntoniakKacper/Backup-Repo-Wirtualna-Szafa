import { AppActions } from "../types/actionTypes";
import { AuthState } from "../types/authTypes";
import {
  SET_USER,
  SET_LOADING,
  SIGN_OUT,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS,
} from "../types/actionTypes";

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: false,
  error: null,
  needVerification: false,
  success: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AppActions) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case NEED_VERIFICATION:
      return {
        ...state,
        needVerification: true,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};
