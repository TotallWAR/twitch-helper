import * as types from '../actions/actionTypes';
import {push} from 'react-router-redux'

const initialState = {
  movies: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_MOVIES_SUCCESS:

      return {movies: action.movies};
    case types.GET_MOVIES_ERROR:
      return {movies: []}
    default:
      return state;
  }
}
