import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGCheck from '../files/list.svg'

import theme from './theme.css'

const List = ({ className }) => (
  <span
    className={clsx(className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGCheck }}
  />
)

List.defaultProps = {
  className: '',
}

List.propTypes = {
  className: string,
}

export default List
