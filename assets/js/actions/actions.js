import * as constants from './constants'
import ApiHelper from '../helpers/ApiHelper'
import { browserHistory } from 'react-router'

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

export const editView = () => ({
  type: constants.EDIT_VIEW
})

export const tableView = () => ({
  type: constants.TABLE_VIEW
})

export const populateSearchResults = (result, pages, page) => {
  return ({
    type: constants.POPULATE,
    payload: { result: result, pages: pages, page: page }
  })
}

export const addView = () => ({
  type: constants.ADD_VIEW
})

export const goToAddView = () => {
  return function (dispatch) {
    dispatch(addView())
    browserHistory.push('/users/entry/add')
  }
}

export const search = (searchTerm, page) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.search(searchTerm, page)
            .then((response) => {
              const result = response.results
              const count = response.count
              dispatch(populateSearchResults(result, Math.floor(count / constants.PAGE_LIMIT) + 1, page))
              dispatch(tableView())

                // extract into client url builder (generating url based on searchterm)
              searchTerm ? browserHistory.push(`/users/search/${searchTerm.replace(' ', '-')}/${page || 1}`) : browserHistory.push(`/users/search/${page || 1}`)
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
              dispatch(editView())
              dispatch(hideLoader())
            })
  }
}

export const safeDelete = (id) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.delete(id)
            .then((result) => {
              dispatch(tableView())
              dispatch(populateSearchResults([]))
              dispatch(hideLoader())
              dispatch(showInfoModal(result.msg))
              browserHistory.push('/users')
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
              browserHistory.push(`/users/entry/${id}`)
            })
  }
}

export const post = (firstName, lastName, user, email, username) => {
  return function (dispatch) {
    dispatch(showLoader())

    return ApiHelper.post(firstName, lastName, user, email, username)
            .then((result) => {
              dispatch(populateSearchResults([result]))
              dispatch(editView())
              dispatch(hideLoader())
              const id = result.id
              browserHistory.push(`/users/entry/${id}`)
            })
  }
}
