// src/actions/sessionActions.js

import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import cookie from 'react-cookies';
import {browserHistory} from 'react-router';

export function loginSuccess(user) {
  return {type: types.LOG_IN_SUCCESS, user: user}
}

export function logInUser(credentials) {
  return function(dispatch) {

    return sessionApi.login(credentials).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Authentication is error');
    }).then((response) => {

      cookie.save('jwt', response.user._id, {path: '/'});
      dispatch(loginSuccess(response.user));
    }).catch((error) => {
      console.error(error);
    });
  };
}

export function registerUser(credentials) {
  return async function(dispatch) {
    console.log("register User session action 1" + credentials.email);
    try {
      let response = await sessionApi.register(credentials);
      if (response.status == 201) {
        return "Вам на почту выслан email подтверждения";
      }
      if (response.status == 400) {
        return "Такой пользователь уже существует";
      }
    } catch (e) {
      console.log("exception " + e);
      return e.message;
    }
  }
}

export function checkUserSuccess(user) {
  return {type: types.LOG_IN_CHECK_SUCCESS, user: user}
}
export function checkUserError(user) {
  cookie.remove('jwt', {path: '/'});
  browserHistory.push("/");
  return {type: types.LOG_IN_CHECK_ERROR}
}

export function checkUser() {
  return function(dispatch) {
    return sessionApi.check().then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Check is error');
    }).then((response) => {
      dispatch(checkUserSuccess(response))
    }).catch((error) => {
      dispatch(checkUserError())
    });
  };
}

export function logOutUser() {
  browserHistory.push("/");
  cookie.remove('jwt', {path: '/'});
  return {type: types.LOG_OUT}
}
