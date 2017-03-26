import * as constants from './constants'
import ApiHelper from '../helpers/ApiHelper'
import { browserHistory } from 'react-router'
import ClientUrlBuilder from '../helpers/ClientUrlBuilder'

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

export const search = (searchTerm, page) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.search(searchTerm || '', page || 1)
            .then((response) => {
              const result = response.results
              const count = response.count
              dispatch(populateSearchResults(result, Math.floor(count / constants.PAGE_LIMIT) + 1, page))
              dispatch(hideLoader())
            })
  }
}

export const lookup = (id) => {
  return function (dispatch) {
    dispatch(showLoader())
    return ApiHelper.lookup(id)
            .then((result) => {
              dispatch(populateSearchResults([result]))
              dispatch(hideLoader())
            })
  }
}

export const safeDelete = (id) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.delete(id)
            .then((result) => {
              dispatch(hideLoader())
              ClientUrlBuilder.searchUserView('', 1)
              dispatch(showInfoModal(result.msg))
            })
  }
}

export const put = (id, firstName, lastName, user, email, username) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.put(id, firstName, lastName, user, email, username)
            .then((result) => {
              dispatch(populateSearchResults([result]))
              dispatch(hideLoader())
              browserHistory.push(`/app/users/entry/${id}`)
            })
  }
}

export const post = (firstName, lastName, user, email, username) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.post(firstName, lastName, user, email, username)
            .then((result) => {
              dispatch(populateSearchResults([result]))
              dispatch(hideLoader())
              const id = result.id
              browserHistory.push(`/app/users/entry/${id}`)
            })
  }
}
