import React from 'react'
import './Nav.css'
import { Link } from'react-router-dom'
import littleLemonLogo from '../assets/images/Logo.svg';

export const Nav = () => {
  return (
    <nav>
      <div className='nav-wrapper'>
        <img src={littleLemonLogo} alt="Logo" />
        <ul>
          <li >
            <Link to="/" >Home</Link>
          </li>
          <li >
            <Link to="/about" >About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
  </nav>
  )
}
