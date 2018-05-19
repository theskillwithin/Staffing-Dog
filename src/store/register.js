export class ReduxRegister {
  constructor() {
    this.emitChange = null
    this.reducers = {}
  }

  getReducers = () => ({
    ...this.reducers,
  })

  setInitialReducers = (reducers) => {
    this.reducers = reducers
  }

  register = (name, reducer) => {
    if (!this.reducers[name]) {
      this.reducers = {
        ...this.reducers,
        [name]: reducer,
      }

      if (this.emitChange) {
        this.emitChange(this.getReducers())
      }
    }
  }

  setChangeListener = (listener) => {
    this.emitChange = listener
  }
}

const reduxRegister = new ReduxRegister()

export default reduxRegister
