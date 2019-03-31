import React from 'react'
import { Link } from 'react-router-dom'

import theme from './theme.css'

const Footer = () => (
  <footer className={theme.footer}>
    <nav>
      <a href="/blog">Blog</a>
      <a href="/terms">Terms</a>
      <a href="/privacy">Privacy</a>
      <Link to="/support">Support</Link>
    </nav>
  </footer>
)

export default Footer
