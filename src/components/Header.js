import React from 'react'

import Logo from '../components/Logo'

const Header = () => (
  <header className="header">
    <div className="container">
      <a className="logo" href="/">
        <Logo />
      </a>
    </div>
  </header>
)

export default Header
