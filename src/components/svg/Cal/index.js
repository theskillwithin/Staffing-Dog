import React from 'react'
import { bool } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

const Cal = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    className={clsx(theme.svg, active && theme.active)}
  >
    <g id="calendar-svg" data-name="calendar-svg" transform="translate(-1026 -414)">
      <rect
        id="Rectangle_335"
        data-name="Rectangle 335"
        className={theme.fill}
        width="15"
        height="2"
        rx="1"
        transform="translate(1026 414)"
      />
      <circle
        id="Ellipse_173"
        data-name="Ellipse 173"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1026 418)"
      />
      <circle
        id="Ellipse_174"
        data-name="Ellipse 174"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1030 418)"
      />
      <circle
        id="Ellipse_175"
        data-name="Ellipse 175"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1034 418)"
      />
      <circle
        id="Ellipse_176"
        data-name="Ellipse 176"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1038 418)"
      />
      <circle
        id="Ellipse_177"
        data-name="Ellipse 177"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1026 422)"
      />
      <circle
        id="Ellipse_178"
        data-name="Ellipse 178"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1030 422)"
      />
      <circle
        id="Ellipse_179"
        data-name="Ellipse 179"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1034 422)"
      />
      <circle
        id="Ellipse_180"
        data-name="Ellipse 180"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1038 422)"
      />
      <circle
        id="Ellipse_181"
        data-name="Ellipse 181"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1026 426)"
      />
      <circle
        id="Ellipse_182"
        data-name="Ellipse 182"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1030 426)"
      />
      <circle
        id="Ellipse_183"
        data-name="Ellipse 183"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1034 426)"
      />
      <circle
        id="Ellipse_184"
        data-name="Ellipse 184"
        className={theme.fill}
        cx="1.5"
        cy="1.5"
        r="1.5"
        transform="translate(1038 426)"
      />
    </g>
  </svg>
)

Cal.defaultProps = {
  active: false,
}

Cal.propTypes = {
  active: bool,
}

export default Cal
