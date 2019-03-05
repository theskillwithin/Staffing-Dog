import React, { Component } from 'react'
import { func, string } from 'prop-types'
import clsx from 'clsx'
import Arrow from '@sdog/components/svg/Arrow'
import Button from '@sdog/components/button'
import SVGCertification from '@sdog/components/svg/files/certification.svg'
import SVGPlantTall from '@sdog/components/svg/files/plant_tall.svg'
import Person from '@sdog/components/svg/Person'
import Svg from '@sdog/components/svg'
import StarTitle from '@sdog/components/star_title'

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
    if (!this.props.type) {
      return (
        <div className={clsx(theme.gettingStarted, theme.gettingStartedSplit)}>
          <div className="left">
            <div>
              <Person className={clsx(theme.group, theme.person, theme.man)} name="man" />
              <Person
                className={clsx(theme.group, theme.person, theme.woman3)}
                name="woman3"
              />
              <Person
                className={clsx(theme.group, theme.person, theme.woman2)}
                name="woman2"
              />
            </div>
            <Button round className={theme.letsGetStartedButton}>
              Get Started as a Professional{' '}
              <span>
                <Arrow small color="white" />
              </span>
            </Button>
          </div>
          <div className={theme.divider} />
          <div className="right">
            <div>
              <Svg name="dentist_chair" className={clsx(theme.group, theme.chair)} />

              <Person
                className={clsx(theme.group, theme.person, theme.woman)}
                name="woman"
              />
            </div>
            <Button round className={theme.letsGetStartedButton}>
              Get Started as a Practice{' '}
              <span>
                <Arrow small color="white" />
              </span>
            </Button>
          </div>
        </div>
      )
    }
    return (
      <div className={theme.gettingStarted}>
        <StarTitle title="Power to the Professional" />

        <div className={theme.svgScene}>
          <span className={clsx(theme.group, theme.groupPlant)}>
            <div
              className={clsx(theme.certification)}
              dangerouslySetInnerHTML={{ __html: SVGCertification }}
            />
            <div
              className={clsx(theme.certification)}
              dangerouslySetInnerHTML={{ __html: SVGPlantTall }}
            />
          </span>

          {this.renderSVG(
            <Person className={clsx(theme.group, theme.person, theme.man)} name="man" />,
          )}

          {this.renderSVG(
            <Person
              className={clsx(theme.group, theme.person, theme.woman)}
              name="woman"
            />,
          )}

          {this.renderSVG(
            <Person
              className={clsx(theme.group, theme.person, theme.woman2)}
              name="woman2"
            />,
          )}

          {this.renderSVG(
            <Person
              className={clsx(theme.group, theme.person, theme.woman3)}
              name="woman3"
            />,
          )}

          {this.renderSVG(
            <Person
              className={clsx(theme.group, theme.person, theme.man2)}
              name="man2"
            />,
          )}

          {this.renderSVG(
            <Person className={clsx(theme.group, theme.person, theme.man)} name="man" />,
            'practice',
          )}

          {this.renderSVG(
            <Svg name="dentist_chair" className={clsx(theme.group, theme.chair)} />,
            'practice',
          )}

          {this.renderSVG(
            <Person
              className={clsx(theme.group, theme.person, theme.woman)}
              name="woman"
            />,
            'practice',
          )}
        </div>
      </div>
    )
  }
}

GetStarted.propTypes = {
  setStep: func.isRequired,
  type: string,
}

export default GetStarted
