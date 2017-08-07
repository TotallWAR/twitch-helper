import React, {Component} from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, DropdownButton, MenuItem, NavItem} from 'react-bootstrap';
// import {IndexLinkContainer} from 'react-router-bootstrap';
import {Route} from 'react-router';
import {connect} from 'react-redux';
import AuthModal from './auth/auth.js';
import LogOut from './auth/logout';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.logged_in.session) {
      return (

        <Navbar.Collapse>
          <Nav navbar>
            <LinkContainer to="/">
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/homepage">
              <NavItem>Список видео</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LogOut bsStyle="primary" login={this.props.logged_in.user.email}/>
          </Nav>
        </Navbar.Collapse>
      );
    } else {
      return (
        <Navbar.Collapse>
          <AuthModal/>
        </Navbar.Collapse>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {logged_in: state.session, current_location: state.routing};
}

export default connect(mapStateToProps)(Menu);
