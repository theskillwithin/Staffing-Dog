import React from 'react'
import { render } from 'react-testing-library'

import UserMenu from './index'

test('UserMenu exists', () => {
  const { getByText } = render(<UserMenu type="provider" />)
  expect(getByText('Billing'))
})
