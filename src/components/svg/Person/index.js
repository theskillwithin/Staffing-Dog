import React from 'react'
import { oneOfType, string, bool } from 'prop-types'

import SVGPersonMan from '../files/person_man.svg'
import SVGPersonMan2 from '../files/person_man2.svg'
import SVGPersonWoman from '../files/person_woman.svg'
import SVGPersonWoman2 from '../files/person_woman2.svg'
import SVGPersonWoman3 from '../files/person_woman3.svg'


const names = {
  man: SVGPersonMan,
  man2: SVGPersonMan2,
  woman: SVGPersonWoman,
  woman2: SVGPersonWoman2,
  woman3: SVGPersonWoman3,
}

const Person = ({ name, className }) => {
  return name && names[name]
    ? (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: names[name] }}
      />
    ) : null
}

Person.defaultProps = {
  className: '',
}

Person.propTypes = {
  name: oneOfType([
    bool,
    string,
  ]).isRequired,
  className: string,
}

export default Person
