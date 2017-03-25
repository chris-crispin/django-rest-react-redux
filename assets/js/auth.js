 /* global localStorage */
import request from 'superagent'
import cookie from 'react-cookie'

const login = (username, password) => {
  return new Promise((resolve) => {
    if (localStorage.token) {
      resolve(true)
    }
    getToken(username, password)
            .then((res) => {
              if (res.authenticated) {
                localStorage.token = res.token
                localStorage.user = username
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
}

const loggedIn = () => {
  return !!localStorage.token
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
                  token: res.body.token
                })
              } else {
                resolve({
                  authenticated: false,
                  token: null
                })
              }
            })
  })
}

export {login, logout, getToken, loggedIn}
