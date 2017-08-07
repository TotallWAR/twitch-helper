class TwitchApi {
  static getMoviesByChannelId(channelId) {
    const request = new Request('http://localhost:3000/getMoviesByChannelId/' + channelId, {
      method: 'get',
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return fetch(request)
  }
}

export default TwitchApi;
