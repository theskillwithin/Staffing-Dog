import React, { Component } from 'react'
import { func, string } from 'prop-types'
import classnames from 'classnames'

import SVGCertification from '../../../../components/svg/files/certification.svg'
import SVGPlantTall from '../../../../components/svg/files/plant_tall.svg'
import Person from '../../../../components/svg/Person'
import Svg from '../../../../components/svg'
import StarTitle from '../../../../components/star_title'

import theme from './theme.css'


class GetStarted extends Component {
  componentDidMount() {
    this.props.setStep(false)
  }

  renderSVG = (SVGComponent, type = 'professional') => {
    if (this.props.type === type) {
      return SVGComponent
    }

    return null
  }

  render() {
    return (
      <div className={theme.gettingStarted}>
        <StarTitle title="Welcome!" />

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

          {this.renderSVG((
            <Person
              className={classnames(theme.group, theme.person, theme.man)}
              name="man"
            />
          ))}

          {this.renderSVG((
            <Person
              className={classnames(theme.group, theme.person, theme.woman)}
              name="woman"
            />
          ))}

          {this.renderSVG((
            <Person
              className={classnames(theme.group, theme.person, theme.woman2)}
              name="woman2"
            />
          ))}

          {this.renderSVG((
            <Person
              className={classnames(theme.group, theme.person, theme.woman3)}
              name="woman3"
            />
          ))}

          {this.renderSVG((
            <Person
              className={classnames(theme.group, theme.person, theme.man2)}
              name="man2"
            />
          ))}

          {this.renderSVG((
            <Person
              className={classnames(theme.group, theme.person, theme.man)}
              name="man"
            />
          ), 'practice')}

          {this.renderSVG((
            <Svg name="dentist_chair" className={classnames(theme.group, theme.chair)} />
          ), 'practice')}

          {this.renderSVG((
            <Person
              className={classnames(theme.group, theme.person, theme.woman)}
              name="woman"
            />
          ), 'practice')}
        </div>
      </div>
    )
  }
}

GetStarted.propTypes = {
  setStep: func.isRequired,
  type: string.isRequired,
}

export default GetStarted
