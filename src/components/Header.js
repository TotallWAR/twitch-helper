import React from 'react';
import {Link} from 'react-router';
import Menu from './menu.jsx';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div id="navbar-collapse" className="collapse navbar-collapse">
            <Menu/>
          </div>

        </div>
      </nav>
    );
  }
}
