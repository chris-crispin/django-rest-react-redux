import * as constants from './constants'
import ApiHelper from '../helpers/ApiHelper'
import browserHistory from 'react-router/lib/browserHistory'
import ClientUrlBuilder from '../helpers/ClientUrlBuilder'
import { logout } from '../auth'

export const showModal = () => ({
  type: constants.SHOW_MODAL
})

export const hideModal = () => ({
  type: constants.HIDE_MODAL
})

export const showInfoModal = (msg) => ({
  type: constants.SHOW_INFO_MODAL,
  payload: msg
})

export const hideInfoModal = () => ({
  type: constants.HIDE_INFO_MODAL
})

export const setUser = (username) => {
  return ({
    type: constants.SET_USER,
    payload: username
  })
}

export const showLoader = () => ({
  type: constants.SHOW_LOADER
})

export const hideLoader = () => ({
  type: constants.HIDE_LOADER
})

export const populateSearchResults = (result, pages, page) => {
  return ({
    type: constants.POPULATE,
    payload: { result: result, pages: pages, page: page }
  })
}

export const populateForeignKeyResults = (result) => {
  return ({
    type: constants.POPULATE_FOREIGN_KEY,
    payload: { result: result }
  })
}

export const search = (searchTerm, page, model) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.search(searchTerm || '', page || 1, model)
            .then((response) => {
              if (response.statusCode === 401) {
                logout()
                dispatch(hideLoader())
                return
              }
              const result = response.results
              const count = response.count
              dispatch(populateSearchResults(result, Math.floor(count / constants.PAGE_LIMIT) + 1, page))
              dispatch(hideLoader())
            })
  }
}

export const getForeignKeys = (model, field, searchTerm) => {
  return function (dispatch) {
    return ApiHelper.search(searchTerm, 1, model)
            .then((response) => {
              if (response.statusCode === 401) {
                logout()
                return
              }
              const foreignMap = {}
              response.results.forEach(result => {
                foreignMap[result.id] = result[field]
              })
              dispatch(populateForeignKeyResults(foreignMap))
            })
  }
}

export const getForeignKey = (model, field, id) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.lookup(id, model)
            .then((response) => {
              if (response.statusCode === 401) {
                logout()
                dispatch(hideLoader())
                return
              }
              const foreignMap = {}
              foreignMap[id] = response[field]
              dispatch(populateForeignKeyResults(foreignMap))
              dispatch(hideLoader())
            })
  }
}

export const lookup = (id, model) => {
  return function (dispatch) {
    dispatch(showLoader())
    return ApiHelper.lookup(id, model)
            .then((response) => {
              if (response.statusCode === 401) {
                logout()
                dispatch(hideLoader())
                return
              }
              dispatch(populateSearchResults([response]))
              dispatch(hideLoader())
            })
  }
}

export const safeDelete = (id, model) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.delete(id, model)
            .then((response) => {
              if (response.statusCode === 401) {
                logout()
                dispatch(hideLoader())
                return
              }
              dispatch(hideLoader())
              ClientUrlBuilder.searchView('', 1, model)
              dispatch(showInfoModal(response.msg))
            })
  }
}

export const put = (id, username, state, model) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.put(id, username, state, model)
            .then((response) => {
              if (response.statusCode === 401) {
                logout()
                dispatch(hideLoader())
                return
              }
              dispatch(populateSearchResults([response]))
              dispatch(hideLoader())
              browserHistory.push(`/app/${model}/entry/${id}`)
            })
  }
}

export const post = (username, state, model) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.post(username, state, model)
            .then((response) => {
              if (response.statusCode === 401) {
                logout()
                dispatch(hideLoader())
                return
              }
              dispatch(populateSearchResults([response]))
              dispatch(hideLoader())
              const id = response.id
              browserHistory.push(`/app/${model}/entry/${id}`)
            })
  }
}
