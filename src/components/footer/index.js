import React from 'react'

import theme from './theme.css'

const Footer = () => (
  <footer className={theme.footer}>
    <nav>
      <a href="/blog">Blog</a>
      <a href="/terms">Terms</a>
      <a href="/privacy">Privacy</a>
      <a href="/support">Support</a>
    </nav>
  </footer>
)

export default Footer
