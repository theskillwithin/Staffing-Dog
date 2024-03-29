import React, { useEffect } from 'react'
import { func, string, object, bool } from 'prop-types'
import clsx from 'clsx'

import Arrow from '@sdog/components/svg/Arrow'
import Button from '@sdog/components/button'
import SVGCertification from '@sdog/components/svg/files/certification.svg'
import SVGPlantTall from '@sdog/components/svg/files/plant_tall.svg'
import Person from '@sdog/components/svg/Person'
import Svg from '@sdog/components/svg'
import StarTitle from '@sdog/components/star_title'

import theme from './theme.css'

const GetStarted = ({ chooseType, type, setStep, goToStep, setType, history }) => {
  useEffect(() => void setStep(false), [])

  const renderSVG = (SVGComponent, isType = 'professional') => {
    if (type === isType) {
      return SVGComponent
    }

    return null
  }

  if (chooseType) {
    return (
      <div className={clsx(theme.gettingStarted, theme.gettingStartedSplit)}>
        <div className={theme.left}>
          <StarTitle title="Professional" />
          <div className={theme.people}>
            <Person className={clsx(theme.group, theme.person, theme.man)} name="man" />
            <Person
              className={clsx(theme.group, theme.person, theme.woman2)}
              name="woman2"
            />
            <Person
              className={clsx(theme.group, theme.person, theme.woman3)}
              name="woman3"
            />
          </div>
          <Button
            onClick={() => {
              setType('professional')
              goToStep({
                currentStep: false,
                nextStep: 1,
                history,
              })
            }}
            round
            className={theme.letsGetStartedButton}
          >
            Get Started as a Professional{' '}
            <span>
              <Arrow small color="white" />
            </span>
          </Button>
        </div>
        <div className={theme.right}>
          <StarTitle title="Practice" />
          <div className={theme.people}>
            <Person
              className={clsx(theme.group, theme.person, theme.woman)}
              name="woman"
            />
            <Svg name="dentist_chair" className={clsx(theme.group, theme.chair)} />
          </div>
          <Button
            onClick={() => {
              setType('practice')
              goToStep({
                currentStep: false,
                nextStep: 1,
                history,
              })
            }}
            round
            className={theme.letsGetStartedButton}
          >
            Get Started as a Practice{' '}
            <span>
              <Arrow small color="white" />
            </span>
          </Button>
        </div>
      </div>
    )
  }

  const title = 'practice' === type ? 'Hire Smart' : 'Power to the Professional'

  return (
    <div className={theme.gettingStarted}>
      <StarTitle title={title} />

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
  history: object.isRequired,
  goToStep: func.isRequired,
  setType: func.isRequired,
  chooseType: bool,
}

GetStarted.defaultProps = { chooseType: false }

export default GetStarted
