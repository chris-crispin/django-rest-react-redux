/**
 * Created by crispinc on 23/12/2016.
 */
// needs splitting into multiple reducers and combining in index.js

import * as constants from '../actions/constants'

export default (state, action) => {
  switch (action.type) {
    case constants.SHOW_MODAL:
      return {
        ...state,
        displayModal: true
      }
    case constants.HIDE_MODAL:
      return {
        ...state,
        displayModal: false
      }
    case constants.SHOW_INFO_MODAL:
      return {
        ...state,
        displayInfoModal: true,
        infoMsg: action.payload
      }
    case constants.HIDE_INFO_MODAL:
      return {
        ...state,
        displayInfoModal: false,
        infoMsg: ''
      }
    case constants.SHOW_LOADER:
      return {
        ...state,
        displayLoader: true
      }
    case constants.HIDE_LOADER:
      return {
        ...state,
        displayLoader: false
      }
    case constants.SET_USER:
      return {
        ...state,
        username: action.payload
      }
    case constants.POPULATE:
      return {
        ...state,
        entries: action.payload.result,
        pages: action.payload.pages,
        page: action.payload.page

      }
    case constants.EDIT_VIEW:
      return {
        ...state,
        displayEditView: true,
        displayAddView: false
      }
    case constants.TABLE_VIEW:
      return {
        ...state,
        displayEditView: false,
        displayAddView: false
      }
    case constants.ADD_VIEW:
      return {
        ...state,
        displayAddView: true
      }
    default:
      return state
  }
}
