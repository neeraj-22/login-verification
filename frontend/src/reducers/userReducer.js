//Importing Constants -- Reducers talk to the state
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_SUCCESS,
  INIT_OTP_REQUEST,
  INIT_OTP_FAIL,
  INIT_OTP_SUCCESS,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstants.js";

//Reducer for Auth
export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      case REGISTER_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

      case REGISTER_USER_SUCCESS :
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
          regSuccess : true
        };

    case LOGIN_FAIL:
      return {
        ...state, 
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

      case REGISTER_USER_FAIL :
        return {
          loading:false,
          regSuccess : false,
          error : action.payload
        }
    case LOGOUT_REQUEST:
      return {
        loading: true,
        isAuthenticated: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT_FAIL:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Reducer for profile functionalities
export const profileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
      };

    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case PROFILE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };


      case INIT_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
        otpGenerated: false,
      };

    case INIT_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otpGenerated:true,
      };

    case INIT_OTP_FAIL:
      return {
        loading: false,
        error: action.payload,
        otpGenerated: false
      };

      case VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
        emailVerified : state.user.isEmailVerified
      };

    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
        emailVerified : true
      };

    case VERIFY_EMAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
        emailVerified : state.user.isEmailVerified
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
