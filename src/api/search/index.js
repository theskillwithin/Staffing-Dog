import axios from 'axios'

import { SIM, API_ROOT, fakePromise } from '../config'

export const search = data => {
  return SIM ? fakePromise({}) : axios.post(`${API_ROOT}/search`, data)
}

export default { search }
