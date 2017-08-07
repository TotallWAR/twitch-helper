import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer} from 'react-router-redux';

import modalReducer from './modalReducer';
import sessionReducer from './sessionReducer';
import movieReducer from './movieReducer';

export default function(initialState = {}) {
  const appReducer = combineReducers({routing: routerReducer, auth: modalReducer, session: sessionReducer, movie: movieReducer});

  const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT') {
      state = undefined;
    }

    return appReducer(state, action);
  };

  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
