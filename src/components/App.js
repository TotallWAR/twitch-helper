import React, {PropTypes} from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header';
import Footer from './Footer';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../actions/sessionActions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.checkUser();
  }

  render() {
    return (
      <DocumentTitle title='Twitch Helper'>
        <div className='App'>
          <Header/>{this.props.children}
          <Footer/>
        </div>
      </DocumentTitle>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(App);
