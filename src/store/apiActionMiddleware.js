import axios from '../api/index'

export const ROOT = '@SD/'

export const createActionName = (name, status, root = ROOT) => `${root}${name}__${status}`

export const createActionTypes = (name, root = ROOT) => ({
  LOADING: createActionName(name, 'LOADING', root),
  ERROR: createActionName(name, 'ERROR', root),
  SUCCESS: createActionName(name, 'SUCCESS', root),
})

export const apiActionMiddleware = ({ dispatch }) => next => async action => {
  const { type, api = false, initialPayload = {} } = action

  if (!api || !api.url) {
    return next(action)
  }

  const actionTypes = createActionTypes(type)

  dispatch({ type: actionTypes.LOADING, payload: initialPayload })

  try {
    const payload = await axios(api)

    dispatch({ type: actionTypes.SUCCESS, payload })
  } catch (err) {
    dispatch({ type: actionTypes.ERROR, payload: err })
  }

  return next(action)
}
