// src/actions/sessionActions.js

import * as types from './actionTypes';
import twitchApi from '../api/twitchApi';
import cookie from 'react-cookies';
import {browserHistory} from 'react-router';

export function getMoviesSuccess(movies) {
  return {type: types.GET_MOVIES_SUCCESS, movies: movies}
}

export function getMoviesError() {
  return {type: types.GET_MOVIES_ERROR, movies: []}
}

export function getMovies(channelId) {
  return function(dispatch) {

    return twitchApi.getMoviesByChannelId(channelId).then((response) => {
      if (response.ok) {
        return response.json();
      }
      dispatch(getMoviesError());
      throw new Error('Get movies failed or not found');
    }).then((response) => {
      dispatch(getMoviesSuccess(response));
    }).catch((error) => {
      console.error(error);
      dispatch(getMoviesError());
    });
  };
}
