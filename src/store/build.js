const buildState = (actions, state, action) => {
  return actions[action.type]
    ? actions[action.type](state, action.payload)
    : state
}

export const build = (
  actions,
  initialSate,
  useHydrate = false,
  runAfter = false,
) => (oldState = initialSate, action) => {
  let state = oldState

  if (useHydrate && !state.hydrated) {
    state = { ...initialSate, ...state, hydrated: true }
  }

  const builtState = buildState(actions, state, action)

  return runAfter
    ? runAfter(builtState, action.payload || {})
    : builtState
}

export const buildSingleValue = (
  actions,
  initialState,
) => (state = initialState, action) => {
  return buildState(actions, state, action)
}

export default build
