export const ROOT = '@SD/'

export const createActionName = (name, status, root = ROOT) => `${root}${name}__${status}`

export const createActionTypes = (name, root = ROOT) => ({
  LOADING: createActionName(name, 'LOADING', root),
  ERROR: createActionName(name, 'ERROR', root),
  SUCCESS: createActionName(name, 'SUCCESS', root),
})
