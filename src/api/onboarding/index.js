import axios from 'axios'

import { SIM, fakePromise } from '../config'

export const saveStep = ({ step, values }) => {
  return SIM
    ? fakePromise({
        data: {
          results: {},
          message: 'Successfully saved step',
          success: true,
        },
      })
    : axios.post('/profile', {
        step,
        values,
      })
}

export default {
  saveStep,
}
