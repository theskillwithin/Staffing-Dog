import buildStore from '@store/build'
import reduxRegister from '@store/register'
import * as searchApi from '@api/search'

export const BASE = '@SD/SEARCH'
export const FETCH = `${BASE}_FETCH`
export const FETCH_RESULTS = `${FETCH}_RESULTS`
export const FETCH_RESULTS_SUCCESS = `${FETCH_RESULTS}_SUCCESS`
export const FETCH_RESULTS_ERROR = `${FETCH_RESULTS}_ERROR`

export const actions = {
  fetchResults: () => ({ type: FETCH_RESULTS }),
  fetchResultsSuccess: results => ({
    type: FETCH_RESULTS_SUCCESS,
    payload: { results },
  }),
  fetchResultsError: error => ({
    type: FETCH_RESULTS_ERROR,
    payload: { error },
  }),
}

export const getResults = () => dispatch => {
  dispatch(actions.fetchResults())

  return searchApi.search
    .send()
    .then(({ data }) => dispatch(actions.fetchResultsSuccess(data.results)))
    .catch(error =>
      dispatch(actions.fetchResultsError(error.message || error || 'error')),
    )
}

export const INITIAL_STATE = {
  results: [],
  loading: true,
  error: false,
}

export const reducers = {
  [FETCH_RESULTS]: state => ({ ...state, loading: true, error: false }),
  [FETCH_RESULTS_SUCCESS]: (state, payload) => ({
    ...state,
    results: payload.results,
    loading: false,
    error: false,
  }),
  [FETCH_RESULTS_ERROR]: (state, payload) => ({
    ...state,
    loading: false,
    errror: payload.error,
  }),
}

const reducer = buildStore(reducers, INITIAL_STATE)

reduxRegister.register('search', reducer)

export default reducer

export const findState = state => state.search
export const findResults = state => findState(state).results
export const findLoading = state => findState(state).loading
export const findError = state => findState(state).error
