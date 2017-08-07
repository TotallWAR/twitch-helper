import React from 'react';
import {Link} from 'react-router';

export default class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let movies = [];
    if (this.props.movies.length) {
      this.props.movies.forEach((elem, i) => {
        movies.push(<Movie key={elem.broadcast_id} videoUrl={elem.url} imageUrl={elem.preview.medium} title={elem.title}/>)
      });
    }

    return (
      <section className="movies">{movies}</section>
    );
  }
}
class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="movies__movie">
        <a key={this.props.imageUrl} href={this.props.videoUrl}>
          <img src={this.props.imageUrl}></img>
          <div className="movies__movie__description">{this.props.title}</div>
        </a>
      </div>
    );
  }
}
