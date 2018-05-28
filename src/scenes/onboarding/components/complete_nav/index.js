import React from 'react'
import classnames from 'classnames'

import SVGCertification from '../../../../components/svg/files/certification.svg'
import SVGPlantTall from '../../../../components/svg/files/plant_tall.svg'
import Button from '../../../../components/button'
import Icon from '../../../../components/icon'

import theme from './theme.css'

const CompleteNav = () => (
  <div className={theme.stepNavComplete}>
    <div className={theme.stepNavCompleteInner}>
      <div className={theme.stepNavCompleteLeft}>
        <div
          className={classnames(theme.plant)}
          dangerouslySetInnerHTML={{ __html: SVGPlantTall }}
        />
      </div>
      <div className={theme.stepNavCompleteRight}>
        <div>
          <div
            className={classnames(theme.certification)}
            dangerouslySetInnerHTML={{ __html: SVGCertification }}
          />
        </div>

        <div>
          <Button primary>
            Advanced Setup <Icon inButton="right" use="arrow_forward" />
          </Button>
        </div>
      </div>
    </div>
  </div>
)

export default CompleteNav
