import React, { Component } from 'react'
import { func } from 'prop-types'
import classnames from 'classnames'

import SVGCertification from '../../../../components/svg/files/certification.svg'
import SVGPlantTall from '../../../../components/svg/files/plant_tall.svg'
import Person from '../../../../components/svg/Person'

import theme from './theme.css'


class GetStarted extends Component {
  componentDidMount() {
    this.props.setStep(false)
  }

  render() {
    return (
      <div className={theme.gettingStarted}>
        <h4>Welcome!</h4>

        <div className={theme.svgScene}>
          <span
            className={classnames(theme.group, theme.groupPlant)}
          >
            <div
              className={classnames(theme.certification)}
              dangerouslySetInnerHTML={{ __html: SVGCertification }}
            />
            <div
              className={classnames(theme.certification)}
              dangerouslySetInnerHTML={{ __html: SVGPlantTall }}
            />
          </span>

          <Person
            className={classnames(theme.group, theme.person, theme.man)}
            name="man"
          />

          <Person
            className={classnames(theme.group, theme.person, theme.woman)}
            name="woman"
          />

          <Person
            className={classnames(theme.group, theme.person, theme.woman2)}
            name="woman2"
          />

          <Person
            className={classnames(theme.group, theme.person, theme.woman3)}
            name="woman3"
          />

          <Person
            className={classnames(theme.group, theme.person, theme.man2)}
            name="man2"
          />
        </div>
      </div>
    )
  }
}

GetStarted.defaultProps = {}

GetStarted.propTypes = {
  setStep: func.isRequired,
}

export default GetStarted
