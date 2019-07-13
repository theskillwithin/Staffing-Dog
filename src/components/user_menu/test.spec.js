import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { INITIAL_STATE as USER_INITIAL_STATE } from '@sdog/store/user'
// import { getToken, getUserId } from '@sdog/store/storage'
import reducers from '@sdog/store/reducers'
import createStore from '@sdog/store'

import UserMenu from './index'

const storeData = {
  user: {
    ...USER_INITIAL_STATE,
    profile: {
      ...USER_INITIAL_STATE.profile,
      id: '123',
      user: {
        email: '',
        first_name: '',
        last_name: '',
        onboarding_status: '',
        phone: '',
        type: '',
        verified_email: false,
        verified_phone: false,
      },
    },
    auth: {
      ...USER_INITIAL_STATE.auth,
      token: '44444',
      fingerprint: '11235',
    },
  },
  alerts: {
    global: [],
  },
}

const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducers, initialState) } = {},
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

test('UserMenu exists', () => {
  const { getByTestId } = renderWithRedux(
    <UserMenu
      type="provider"
      first="austin"
      last="peterson"
      office="test"
      photo={false}
    />,
    {
      initialState: storeData,
    },
  )
  // const logoutDiv = container.querySelector('div[data-testid="test-logout"]')
  // expect(getByText(/Logout/))
  // console.log('wat', logoutDiv)
  expect(getByTestId('test-logout'))
})
