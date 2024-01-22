import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import './Dropdown.css';
import Dropdown1 from './Dropdown1';
import Dropdown2 from './Dropdown2';
import Dropdown4 from './Dropdown4';
import Dropdown5 from './Dropdown5'



function refreshPage() {
  window.location.reload(false);
}

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown4, setDropdown4] = useState(false);
  const [dropdown5, setDropdown5] = useState(false);


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
      setDropdown1(false);
      setDropdown2(false);
      setDropdown4(false);
      setDropdown5(false);
    } else {
      setDropdown(true);
      setDropdown1(true);
      setDropdown2(true);
      setDropdown4(true);
      setDropdown5(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
      setDropdown1(false);
      setDropdown2(false);
      setDropdown4(false);
      setDropdown5(false);
    } else {
      setDropdown(false);
      setDropdown1(false);
      setDropdown2(false);
      setDropdown4(false);
      setDropdown5(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='' className='navbar-logo' onClick={closeMobileMenu}>
          Numerical Project
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/roe'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Root Of Equation <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/linear'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Linear Agiba <i className='fas fa-caret-down' />
            </Link>
            {dropdown1 && <Dropdown1 />}
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/inter'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Interpolation <i className='fas fa-caret-down' />
            </Link>
            {dropdown2 && <Dropdown2 />}
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/spline'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Spline <i className='fas fa-caret-down' />
            </Link>
            {dropdown4 && <Dropdown4 />}
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/regression'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Regression <i className='fas fa-caret-down' />
            </Link>
            {dropdown5 && <Dropdown5 />}
          </li>
        </ul>

      </nav>
    </>
  );
}

export default Navbar;