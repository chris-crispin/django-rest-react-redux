/* global localStorage */
import React from 'react'
import './styles.scss'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import Nav from 'react-bootstrap/lib/Nav'

const Header = ({loggedIn, username, logout, model, showModal}) => {
  const appName = 'django-rest-react-redux'
  let brand = []
  brand.push(model
    ? <a key={0}>{appName}: <span className='header__brand--span'>{model}</span></a>
    : <a key={0}>{appName}</a>)
  return (
    <div className='header'>
      <Navbar inverse collapseOnSelect className='header__navbar'>
        <Navbar.Header>
          <Navbar.Brand className='header__brand'>
            {brand}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className='header__nav'>
            <NavItem eventKey={1} href='#' onClick={showModal}>About</NavItem>
            {
              loggedIn &&
              <NavDropdown id={'models'} eventKey={2} title='Models'>
                <MenuItem eventKey={2.1}>Users</MenuItem>
                <MenuItem eventKey={2.2}>Groups</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2.3}>Players</MenuItem>
                <MenuItem eventKey={2.3}>Teams</MenuItem>
              </NavDropdown>
            }
          </Nav>
          {
            loggedIn &&
            <Nav pullRight>
              <NavDropdown id={'account'} eventKey={3} title={username || localStorage.getItem('user')}>
                <MenuItem eventKey={3.1}>
                  User
                </MenuItem>
                <MenuItem onClick={logout} eventKey={3.2}>
                  Logout
                </MenuItem>
              </NavDropdown>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

Header.PropTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  username: React.PropTypes.string.isRequired,
  logout: React.PropTypes.func,
  model: React.PropTypes.string,
  showModal: React.PropTypes.func.isRequired
}

export default Header
