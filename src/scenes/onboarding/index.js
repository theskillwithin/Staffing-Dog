import React, { useEffect } from 'react'
import { string, shape, func } from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { setHtmlClass, removeHtmlClass } from '../../utils/document'
import { getUserProfile as getUserProfileAction } from '../../store/user'

import Layout from './components/layout'

const Onboarding = ({ match, getUserProfile }) => {
  useEffect(() => {
    setHtmlClass('html-onboarding')
    getUserProfile()

    return () => removeHtmlClass('html-onboarding')
  }, [])

  return <Route path={`${match.url}/:type?`} component={Layout} />
}

Onboarding.propTypes = {
  getUserProfile: func.isRequired,
  match: shape({
    url: string.isRequired,
  }).isRequired,
}

export const mapActionsToProps = { getUserProfile: getUserProfileAction }

export default connect(
  null,
  mapActionsToProps,
)(Onboarding)
