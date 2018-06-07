import React from 'react'
import { shallow } from 'enzyme'
// import render from 'react-test-renderer'

import Button from './index'

describe('Button', () => {
  let button
  let onClick

  beforeEach(() => {
    button = shallow(<Button />)
    onClick = jest.fn()
  })

  it('match snapshot', () => {
    expect(button).toMatchSnapshot()
  })

  it('should fire onclick', () => {
    button.setProps({ onClick })
    button.simulate('click')

    expect(onClick).toHaveBeenCalledTimes(1)

    onClick.mockClear()
  })

  it('should add round class', () => {
    button.setProps({ round: true })
    expect(button.find('.round')).toBeTruthy()
  })

  it('should add short class', () => {
    button.setProps({ short: true })
    expect(button.find('.short')).toBeTruthy()
  })
})
