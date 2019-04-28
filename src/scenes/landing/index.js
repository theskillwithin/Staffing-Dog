import React from 'react'
import clsx from 'clsx'
import { useDocumentTitle, useHtmlClass } from '@sdog/utils/document'
import Logo from '@sdog/components/logo'
import StarTitle from '@sdog/components/star_title'
import SVGCertification from '@sdog/components/svg/files/certification.svg'
import SVGPlantTall from '@sdog/components/svg/files/plant_tall.svg'
import Person from '@sdog/components/svg/Person'

import appTheme from '../app/theme.css'

import theme from './theme.css'

const Landing = () => {
  useHtmlClass('html-landing')
  useDocumentTitle('Setup Complete')

  return (
    <div className={appTheme.pageContent}>
      <div className={theme.landingContainer}>
        <div className={theme.logo}>
          <Logo width="63px" largeTxt />
        </div>

        <div className={theme.landing}>
          <div className={theme.starTitle}>
            <StarTitle title="Setup Complete" />
          </div>

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

            <Person className={clsx(theme.group, theme.person, theme.man)} name="man" />

            <Person
              className={clsx(theme.group, theme.person, theme.woman)}
              name="woman"
            />

            <Person
              className={clsx(theme.group, theme.person, theme.woman2)}
              name="woman2"
            />

            <Person
              className={clsx(theme.group, theme.person, theme.woman3)}
              name="woman3"
            />

            <Person className={clsx(theme.group, theme.person, theme.man2)} name="man2" />
          </div>

          <div className={theme.bottom}>
            We are almost ready to let you into our staffing network exclusively for
            Dental Professionals like you! We will reach out when it’s go time…
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
