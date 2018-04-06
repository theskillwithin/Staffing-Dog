import React from 'react'
import { oneOfType, string, bool } from 'prop-types'

import SVGDesktopSearch from './files/desktop_search.svg'
import SVGMobile from './files/mobile.svg'
import SVGShirt from './files/shirt.svg'
import SVGComputer from './files/computer.svg'
import SVGDentistChair from './files/dentist_chair.svg'


const names = {
  desktop_search: SVGDesktopSearch,
  mobile: SVGMobile,
  shirt: SVGShirt,
  computer: SVGComputer,
  dentist_chair: SVGDentistChair,
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
  name: oneOfType([
    bool,
    string,
  ]),
  className: string,
}

export default Svg
