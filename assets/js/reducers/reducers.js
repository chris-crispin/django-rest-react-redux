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
    default:
      return state
  }
}
