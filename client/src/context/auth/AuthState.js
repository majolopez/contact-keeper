import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';


const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null  
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load user

  //Register user

  //Login User

  //Logout

  //Clear Errors

  return (
    <AuthContext.Provider 
      value={{
       token: state.token,
       token: state.isAuthenticated,
       token: state.loading,
       token: state.user,
       token: state.error
      }}
    >
      { props.children }
    </AuthContext.Provider>
  )
};

export default AuthState