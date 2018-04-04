import init from '../../utils/init'

import store from './store'
import Layout from './components/layout'


window.StaffingDog = window.StaffingDog || {}

window.StaffingDog.init = storeData =>
  init(Layout, store, 'onboarding', storeData)
