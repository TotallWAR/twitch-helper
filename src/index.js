import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, Redirect} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import {syncHistoryWithStore} from 'react-router-redux';

import HomePage from './components/HomePage.jsx';
import App from './components/App';
import Index from './components/Index.jsx';

import './dist/css/style.css';
import './styles/main.scss';

//связка обычного роутера реакта с роутером редакса
const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route exact path="/" component={Index}/>
        <Route path="/homepage" component={HomePage}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
