import React from 'react'
import clsx from 'clsx'
import { node, bool, string, array, oneOfType } from 'prop-types'

import Logo from '@sdog/components/logo'
import LoadingBar from '@sdog/components/loading_bar'
import Toaster from '@sdog/components/toaster'
import Logout from '@sdog/components/logout'

import '../../styles.css'
import styles from '../../theme.css'

export const Layout = ({ children, loading, error }) => (
  <div className={styles.app}>
    <div className={styles.appInner}>
      <Top loading={loading} error={error} />

      {children}
    </div>
  </div>
)

Layout.propTypes = {
  children: node,
  loading: bool,
  error: oneOfType([string, array, bool]),
}
Layout.defaultProps = { children: null, loading: false, error: false }

export const Top = ({ children, loading, error }) => (
  <div className={clsx(styles.appTop, loading && styles.appTopLoading)}>
    <div className={styles.appTopInner}>
      <LoadingBar />
    </div>

    <div className={styles.logout}>
      <Logout />
    </div>

    <Toaster>{error}</Toaster>

    {children}
  </div>
)

Top.propTypes = { children: node, loading: bool, error: oneOfType([string, array, bool]) }
Top.defaultProps = { children: null, loading: false, error: false }

export const Header = ({ children }) => (
  <div className={styles.appHeader}>
    <div className={styles.logo}>
      <Logo width="63px" largeTxt />
    </div>

    {children}
  </div>
)

Header.propTypes = { children: node }
Header.defaultProps = { children: null }

export const Content = ({
  children,
  showSidebar = false,
  showBox = false,
  showComplete = false,
}) => (
  <div
    className={clsx(
      styles.appContent,
      !showBox && styles.noType,
      showComplete && styles.appContentComplete,
    )}
  >
    <div className={clsx(styles.box, showSidebar && styles.showSidebar)}>{children}</div>
  </div>
)

Content.propTypes = {
  children: node,
  showSidebar: bool,
  showBox: bool,
  showComplete: bool,
}
Content.defaultProps = {
  children: null,
  showSidebar: false,
  showBox: false,
  showComplete: false,
}
