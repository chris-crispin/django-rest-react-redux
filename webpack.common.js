exports._isVendor = (module) => {
  if (typeof module.userRequest !== 'string') {
    return false
  }
  return module.userRequest.indexOf('/node_modules/') >= 0
}
