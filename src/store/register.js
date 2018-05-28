export class ReduxRegister {
  emitChange = null
  reducers = {}
  hasSetInitialReducers = false

  getReducers = () => ({ ...this.reducers })

  setInitialReducers = (reducers = {}) => {
    if (!this.hasSetInitialReducers) {
      this.reducers = { ...reducers }
      this.hasSetInitialReducers = true
    } else {
      throw new Error('Initial Reducers have already been set')
    }
  }

  register = (name, reducer) => {
    if (!this.reducers[name]) {
      const newReducers = {
        ...this.reducers,
        ...this.asyncReducers,
        [name]: reducer,
      }

      this.reducers = newReducers

      if (this.emitChange) {
        this.emitChange({ ...newReducers })
      }
    } else {
      throw new Error(`Reducer [${name}] has already been registered`)
    }
  }

  setChangeListener = (listener = false) => {
    this.emitChange = listener
  }
}

const reduxRegister = new ReduxRegister()

export default reduxRegister
