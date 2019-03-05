import React, { useEffect } from 'react'
import { func, string, object } from 'prop-types'
import { withRouter } from 'react-router-dom'
import clsx from 'clsx'
import Arrow from '@sdog/components/svg/Arrow'
import Button from '@sdog/components/button'
import SVGCertification from '@sdog/components/svg/files/certification.svg'
import SVGPlantTall from '@sdog/components/svg/files/plant_tall.svg'
import Person from '@sdog/components/svg/Person'
import Svg from '@sdog/components/svg'
import StarTitle from '@sdog/components/star_title'

import theme from './theme.css'

const GetStarted = ({ type, setStep }) => {
  useEffect(() => {
    setStep(false)
  })

  const renderSVG = (SVGComponent, isType = 'professional') => {
    if (type === isType) {
      return SVGComponent
    }

    return null
  }

  if (!type) {
    return (
      <div className={clsx(theme.gettingStarted, theme.gettingStartedSplit)}>
        <div className={theme.left}>
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
        <div className={theme.right}>
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

        {renderSVG(
          <Person className={clsx(theme.group, theme.person, theme.man)} name="man" />,
        )}

        {renderSVG(
          <Person
            className={clsx(theme.group, theme.person, theme.woman)}
            name="woman"
          />,
        )}

        {renderSVG(
          <Person
            className={clsx(theme.group, theme.person, theme.woman2)}
            name="woman2"
          />,
        )}

        {renderSVG(
          <Person
            className={clsx(theme.group, theme.person, theme.woman3)}
            name="woman3"
          />,
        )}

        {renderSVG(
          <Person className={clsx(theme.group, theme.person, theme.man2)} name="man2" />,
        )}

        {renderSVG(
          <Person className={clsx(theme.group, theme.person, theme.man)} name="man" />,
          'practice',
        )}

        {renderSVG(
          <Svg name="dentist_chair" className={clsx(theme.group, theme.chair)} />,
          'practice',
        )}

        {renderSVG(
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

GetStarted.propTypes = {
  setStep: func.isRequired,
  type: string,
  history: object,
}

export default withRouter(GetStarted)
