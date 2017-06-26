/* global localStorage */
import request from 'superagent'
import * as constants from '../actions/constants'
import { URLS } from './ModelHelper'

export default class ApiHelper {

  static _authHeader (token) {
    return `JWT ${token}`
  }

  static search (searchTerm, page, model) {
    const url = searchTerm
    ? `${URLS.host}:${URLS.port}/${model}/?q=${searchTerm}&limit=${constants.PAGE_LIMIT}&offset=${constants.PAGE_LIMIT * (page - 1)}`
    : `${URLS.host}:${URLS.port}/${model}?limit=${constants.PAGE_LIMIT}&offset=${constants.PAGE_LIMIT * (page - 1)}`
    return new Promise((resolve) => {
      request
        .get(url)
        .set('Accept', 'application/json')
        .set('Authorization', this._authHeader(localStorage.getItem('token')))
        .end((err, res) => {
          if (err) {
            if (res.statusCode === 401) {
              resolve(res)
            } else {
              resolve(err)
            }
          } else {
            resolve(res.body)
          }
        })
    })
  }

  static lookup (id, model) {
    const url = `${URLS.host}:${URLS.port}/${model}/${id}`
    return new Promise((resolve) => {
      request
        .get(url)
        .set('Accept', 'application/json')
        .set('Authorization', this._authHeader(localStorage.getItem('token')))
        .end((err, res) => {
          if (err) {
            if (res.statusCode === 401) {
              resolve(res)
            } else {
              resolve(err)
            }
          } else {
            resolve(res.body)
          }
        })
    })
  }

  static delete (id, model) {
    const url = `${URLS.host}:${URLS.port}/${model}/${id}`
    return new Promise((resolve) => {
      request
        .delete(url)
        .set('Accept', 'application/json')
        .set('Authorization', this._authHeader(localStorage.getItem('token')))
        .end((err, res) => {
          if (err) {
            resolve({msg: `Failed to delete entry ${id}.`})
          } else {
            resolve({msg: `Entry ${id} successfully deleted.`})
          }
        })
    })
  }

  static put (id, username, state, model) {
    const url = `${URLS.host}:${URLS.port}/${model}/${id}/`
    const payload = {...state}
    return new Promise((resolve) => {
      request
        .put(url)
        .set('Accept', 'application/json')
        .set('Authorization', this._authHeader(localStorage.getItem('token')))
        .withCredentials()
        .send(payload)
        .end((err, res) => {
          if (err) {
            if (res.statusCode === 401) {
              resolve(res)
            } else {
              resolve(err)
            }
          } else {
            resolve(res.body)
          }
        })
    })
  }

  static post (username, state, model) {
    const url = `${URLS.host}:${URLS.port}/${model}/`
    const payload = {...state}
    return new Promise((resolve) => {
      request
        .post(url)
        .set('Accept', 'application/json')
        .set('Authorization', this._authHeader(localStorage.getItem('token')))
        .withCredentials()
        .send(payload)
        .end((err, res) => {
          if (err) {
            if (res.statusCode === 401) {
              resolve(res)
            } else {
              resolve(err)
            }
          } else {
            resolve(res.body)
          }
        })
    })
  }
}
