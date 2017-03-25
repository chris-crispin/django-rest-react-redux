import request from 'superagent'
import * as constants from '../actions/constants'
/* global localStorage */
export default class ApiHelper {

  static search (searchTerm, page) {
    const url = searchTerm ? `/users/?q=${searchTerm}&limit=${constants.PAGE_LIMIT}&offset=${constants.PAGE_LIMIT * (page - 1)}` : `/users?limit=${constants.PAGE_LIMIT}&offset=${constants.PAGE_LIMIT * (page - 1)}`
    return new Promise((resolve) => {
      request
        .get(url)
        .set('Accept', 'application/json')
        .set('Authorization', 'Token ' + localStorage.token)
        .end((err, res) => {
          if (err) {
            resolve(err)
          } else {
            resolve(res.body)
          }
        })
    })
  }

  static lookup (id) {
    const url = `/users/${id}`
    return new Promise((resolve) => {
      request
        .get(url)
        .set('Accept', 'application/json')
        .set('Authorization', 'Token ' + localStorage.token)
        .end((err, res) => {
          if (err) {
            resolve(err)
          } else {
            resolve(res.body)
          }
        })
    })
  }

  static delete (id) {
    const url = `/users/${id}`
    return new Promise((resolve) => {
      request
        .delete(url)
        .set('Accept', 'application/json')
        .set('Authorization', 'Token ' + localStorage.token)
        .end((err, res) => {
          if (err) {
            resolve({msg: `Failed to delete entry ${id}.`})
          } else {
            resolve({msg: `Entry ${id} successfully deleted.`})
          }
        })
    })
  }

  static put (id, username, state) {
    const url = `/users/${id}/`
    const payload = {
      id: id,
      first_name: state.firstName,
      last_name: state.lastName,
      username: state.user,
      email: state.email,
      user_last_modified: username,
      is_active: state.isActive !== 'undefined' ? state.isActive : false,
      is_staff: state.isStaff !== 'undefined' ? state.isStaff : false,
      is_superuser: state.isSuper !== 'undefined' ? state.isSuper : false
    }
    return new Promise((resolve) => {
      request
        .put(url)
        .set('Accept', 'application/json')
        .set('Authorization', 'Token ' + localStorage.token)
        .withCredentials()
        .send(payload)
        .end((err, res) => {
          if (err) {
            resolve(err)
          } else {
            resolve(res.body)
          }
        })
    })
  }

  static post (username, state) {
    const url = '/users/'
    const payload = {
      first_name: state.firstName,
      last_name: state.lastName,
      username: state.user,
      email: state.email,
      user_added: username,
      user_last_modified: username,
      is_active: state.isActive !== 'undefined' ? state.isActive : false,
      is_staff: state.isStaff !== 'undefined' ? state.isStaff : false,
      is_superuser: state.isSuper !== 'undefined' ? state.isSuper : false
    }
    return new Promise((resolve) => {
      request
        .post(url)
        .set('Accept', 'application/json')
        .set('Authorization', 'Token ' + localStorage.token)
        .withCredentials()
        .send(payload)
        .end((err, res) => {
          if (err) {
            resolve(err)
          } else {
            resolve(res.body)
          }
        })
    })
  }
}
