import React from 'react'
import classnames from 'classnames'
import Button from '@component/button'
import Icon from '@component/icon'

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
      <div className={theme.location}>
        <Icon use="location_on" />
        <strong>Salt Lake City, UT</strong>
      </div>
      <div className={theme.details}>
        <dl>
          <dt>Job Type</dt>
          <dd>Temporary</dd>
          <dt>Position</dt>
          <dd>Dental Hygienist</dd>
          <dt>Rate</dt>
          <dd>$15 hr</dd>
          <dt>Experience</dt>
          <dd>4-7 Years</dd>
        </dl>
      </div>
      <div className={theme.apply}>
        <Button primary round>
          Apply Now
        </Button>
      </div>
    </section>
    <section className={theme.details}>
      <p className={theme.notice}>
        The following information is intended to be representative of the essential
        functions performed by incumbents in this position and is not all-inclusive. The
        omission of a specific task or function will not preclude it from the position if
        the work is similar, related or a logical extension of position responsibilities.
      </p>
      <h2>Responsibilities</h2>
      <ul>
        <li>Feeling comfortable diagnosing and treating Periodontal Disease</li>
        <li>Taking dental x-rays with use of Nomad with necessary</li>
        <li>Educating and answering questions concerning patient’s oral hygiene</li>
        <li>Developing care plans for maintaining good dental hygiene</li>
        <li>Fluoride administration and sealant applications</li>
        <li>Administering local anesthetic</li>
        <li>
          Treatment planning and scheduling appointments using dental system Dentrix
        </li>
        <li>
          Preparing patients for dental procedures by making them comfortable and
          providing any instructions
        </li>
        <li>Sterilizing dental instruments and equipment</li>
      </ul>
      <h2>Skills and Education</h2>
      <ul>
        <li>Exceptional communication Skills</li>
        <li>Hygiene Degree</li>
        <li>Dental Hygienist License ( State )</li>
        <li>Anesthetic License ( National )</li>
        <li>Dentrix / Dexis ( Optional )</li>
        <li>Dental Hygienist 1 year ( Required ) 2 years ( Preferred )</li>
      </ul>
    </section>
  </div>
)

export default ViewJob
