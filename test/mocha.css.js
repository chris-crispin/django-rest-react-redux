function doNothing () {
  return null
}

require.extensions['.css'] = doNothing
require.extensions['.less'] = doNothing
require.extensions['.scss'] = doNothing
