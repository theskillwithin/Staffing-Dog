import React from 'react'
import classnames from 'classnames'

import appTheme from '../../../app/theme.css'

import theme from './theme.css'

const ViewJob = () => (
  <div className={classnames(appTheme.pageContent, theme.pageContent)}>
    <section className={theme.title}>
      <img src="http://fillmurray.com/133/92" alt="Job Logo" />
      <div>
        <h2>Temporary Hygienist Needed for Maternity Leave</h2>
        <h4>APEX Dental</h4>
      </div>
    </section>
    <section>
      <p>
        We are in need of a RDH for the months of December, January and February for
        maternity leave. Possibly turning into a part-time permanet position. Dentrix
        knowlege is preferred. Professional position responsible to provide dental
        prophylaxis, application of fluoride solutions, varnishes, and sealants. Assists
        the dentist as required (i.e. x-rays, impressions, etc)
      </p>
    </section>
  </div>
)

export default ViewJob
