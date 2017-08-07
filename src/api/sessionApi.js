// src/api/sessionApi.js;
import cookie from 'react-cookies';

class SessionApi {
  static login(credentials) {
    const request = new Request('http://localhost:3000/login', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });

    return fetch(request)
  }

  static check() {
    const request = new Request('http://localhost:3000/check', {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json', 'Authorization': cookie.load('jwt')})
    });

    return fetch(request)
  }

  static register(credentials) {
    console.log(credentials.email);
    const request = new Request('http://localhost:3000/register', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });

    return fetch(request)
  }
}

export default SessionApi;
