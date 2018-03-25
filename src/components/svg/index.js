import React from 'react'
import PropTypes from 'prop-types'

import SVGDesktopSearch from './files/desktop_search.svg'
import SVGMobile from './files/mobile.svg'
import SVGShirt from './files/shirt.svg'
import SVGComputer from './files/computer.svg'


const names = {
  desktop_search: SVGDesktopSearch,
  mobile: SVGMobile,
  shirt: SVGShirt,
  computer: SVGComputer,
}

const Svg = ({ name, className }) => {
  return name && names[name]
    ? (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: names[name] }}
      />
    ) : null
}

Svg.defaultProps = {
  name: false,
  className: '',
}

Svg.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  className: PropTypes.string,
}

export default Svg
