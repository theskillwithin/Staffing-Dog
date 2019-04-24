import React from 'react'
import { Link } from 'react-router-dom'

import theme from './theme.css'

const Footer = () => (
  <footer className={theme.footer}>
    <nav>
      <a href="/blog">Blog</a>
      <Link to="/terms">Terms</Link>
      <Link to="/privacy">Privacy</Link>
      <Link to="/support">Support</Link>
    </nav>
  </footer>
)

export default Footer
