import React, {Component} from 'react';
import * as twitchActions from '../actions/twitchActions';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Movies from './Movie.jsx'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.searchData = {
      channelName: 'lck1'
    };

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
  }

  onChangeSearch(event) {
    const field = event.target.name;
    this.searchData[field] = event.target.value;
  }

  onSubmitSearch(event) {
    event.preventDefault();
    this.props.actions.getMovies(this.searchData.channelName);
  }

  render() {

    return (
      <div className="content">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Введите название канала
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl className="form-control_wide" name="channelName" label="" type="text" placeholder="lck1" onChange={this.onChangeSearch}/>
              </FormGroup>
              {' '}
              <Button type="submit" onClick={this.onSubmitSearch}>Найти</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="movies_wrapper">
          <Movies movies={this.props.movies}/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(twitchActions, dispatch)
  };
}
function mapStateToProps(store) {
  const {movies} = store.movie;

  return {movies};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
