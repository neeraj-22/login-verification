import axios from "axios";

//Importing Constants
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  INIT_OTP_REQUEST,
  INIT_OTP_FAIL,
  INIT_OTP_SUCCESS,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstants.js";

//action to register user
export const registerUser = (name, email, password) => async( dispatch ) => {
  try{
    dispatch({type : REGISTER_USER_REQUEST })

    const config = { headers : {"Content-Type" : "application/json"}};

    const { data } = await axios.post(
      `/api/`,
      {name, email, password},
      config
    )

    dispatch({ type : REGISTER_USER_SUCCESS, payload : data.user})
  }
  catch(error){
    dispatch({ type : REGISTER_USER_FAIL, payload : error.response.data.message})
  }
}

//Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/signin`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Updating User Details
export const updateUserDetails = (name) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/update`,
      { name },
      config
    );

    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: PROFILE_UPDATE_FAIL, payload: error.response.data.message });
  }
};

//Generating OTP and saving it to DB
export const initOTPandSaveToDB = () => async (dispatch) => {
  try {
    dispatch({ type: INIT_OTP_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/verify-email`,
      config
    );

    dispatch({ type: INIT_OTP_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: INIT_OTP_FAIL, payload: error.response.data.message });
  }
};

//Verifying Email , based on entered otp
export const verifyEmail = ( enteredOTP ) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_EMAIL_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/verify-email`,
      { enteredOTP },
      config
    );

    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: VERIFY_EMAIL_FAIL, payload: error.response.data.message });
  }
};

//signing out
export const signout = () => async(dispatch) => {
  try{
    dispatch({type:LOGOUT_REQUEST})
    const config =  { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.get(
      `/api/signout`,
      config     
      ) 
     dispatch({type: LOGOUT_SUCCESS, payload:data.message}) 
  } catch(error){
    dispatch({type:LOGOUT_FAIL, payload:error})

  }
}

//Error Handling
export const clearErrors = () => async(dispatch) => {

    dispatch({type:CLEAR_ERRORS})

};