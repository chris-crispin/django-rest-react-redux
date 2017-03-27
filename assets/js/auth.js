 /* global localStorage */
import request from 'superagent'
import cookie from 'react-cookie'
import ClientUrlBuilder from './helpers/ClientUrlBuilder'

const login = (username, password) => {
  return new Promise((resolve) => {
    if (localStorage.getItem('token')) {
      resolve(true)
    }
    getToken(username, password)
            .then((response) => {
              if (response.authenticated) {
                localStorage.setItem('token', response.token)
                localStorage.setItem('user', response.user.username)
                resolve(true)
              } else {
                resolve(false)
              }
            })
  })
}

const logout = () => {
  delete localStorage.token
  delete localStorage.user
  ClientUrlBuilder.loginView()
}

const loggedIn = () => {
  return !!localStorage.getItem('token')
}

const getToken = (username, password) => {
  const payload = { username: username, password: password }

  return new Promise((resolve) => {
    request
            .post('/obtain-auth-token/')
            .set('Accept', 'application/json')
            .set('X-CSRFToken', cookie.select(new RegExp('csrftoken')).csrftoken)
            .send(payload)
            .end((err, res) => {
              if (!err) {
                resolve({
                  authenticated: true,
                  token: res.body.token,
                  user: res.body.user
                })
              } else {
                resolve({
                  authenticated: false,
                  token: null,
                  user: null
                })
              }
            })
  })
}

export {login, logout, getToken, loggedIn}
