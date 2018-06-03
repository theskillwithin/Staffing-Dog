import React from 'react'
import { mount } from 'enzyme'

import Button from './index'

describe('Button', () => {
  let button
  let onClick

  beforeEach(() => {
    button = mount(<Button>My Button</Button>)
    onClick = jest.fn()
  })

  it('match snapshot', () => {
    expect(button).toMatchSnapshot()
  })

  it('should fire onclick', () => {
    button.setProps({ onClick })
    button.find('button').simulate('click')

    expect(onClick).toHaveBeenCalledTimes(1)

    onClick.mockClear()
  })
})
