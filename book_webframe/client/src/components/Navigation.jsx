import React, { useState } from 'react';
import{NavLink as RouterNavLink} from 'react-router-dom';
import UserStore from '../userStore/userStore'

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {NavDropdown} from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
  const [isOpen, setIsOpen] = useState(false);

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0(
  );


  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () => {
    logout(
      UserStore.isLoggedIn = false,
      UserStore.username = '',
      {
        returnTo: window.location.origin,
      }
    );
  }

  const userSet = () =>{
    UserStore.isLoggedIn = true;
    UserStore.username = user.nickname;
    console.log("called")
    
    //console.log("nav-user: ", user.nickname)
  }
  
  if(isAuthenticated){ // when login
    return (
      <div className="nav-container">
        {userSet()}
        <Navbar expand="md" style={{ backgroundColor: "#222222", padding:"4px" }}>
          <Container>
            <NavbarBrand className="logo" />
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
              <NavLink id="main-nav"> 
              <RouterNavLink 
              id="myaccount-link"
              to="/Home">HOME
              </RouterNavLink>
              </NavLink>
                      <NavDropdown title="BOOK SWAP" id="collasible-nav-dropdown"
                      show={show}
                      onMouseEnter={showDropdown}
                      onMouseLeave={hideDropdown}
                      >

                          <NavDropdown.Item>
                            <className/>
                            <RouterNavLink
                              id="bookswap-link"
                              to="/Bookpost"
                              activeClassName="router-link-exact-active"
                            >
                              Post Books
                            </RouterNavLink>
                          </NavDropdown.Item>

                          <NavDropdown.Item>
                            <className/>
                            <RouterNavLink
                              id="bookswap-link"
                              to="/Booklist"
                              activeClassName="router-link-exact-active"
                            >
                              Search Books
                            </RouterNavLink>
                          </NavDropdown.Item>

                          <NavDropdown.Item>
                            <className/>
                            <RouterNavLink
                              id="bookswap-link"
                              to= "/ManageRequests"
                              activeClassName="router-link-exact-active"
                            >
                              Manage Requests
                            </RouterNavLink>
                          </NavDropdown.Item>
                      </NavDropdown>

                      <NavLink id="main-nav">
                        <className/>
                        <RouterNavLink
                          id="myaccount-link"
                          to="/Myaccount"
                          activeClassName="router-link-exact-active"
                        >
                          MY ACCOUNT
                        </RouterNavLink>
                      </NavLink>
                
                      <NavLink id="main-nav"> 
                      <RouterNavLink
                      id="myaccount-link"
                        to="/Cservice">Q&A
                      </RouterNavLink>
                      </NavLink>


                      {isAuthenticated && (
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/external-api"
                      exact
                      activeClassName="router-link-exact-active"
                    >
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
              <Nav className="d-none d-md-block" navbar>
                {!isAuthenticated && (
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      onClick={() => loginWithRedirect({ action: 'signup' })}
                    >
                      Sign Up
                    </Button>
                  </NavItem>
                )}
                {isAuthenticated && (
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/external-api"
                      exact
                      activeClassName="router-link-exact-active"
                    >

                    </NavLink>
                  </NavItem>
                )}
              </Nav>
              <Nav className="d-none d-md-block" navbar>
                {!isAuthenticated && (
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      onClick={()=>loginWithRedirect()}
                    >
                      Log in
                    </Button>
                  </NavItem>
                )}
                {isAuthenticated && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret id="profileDropDown">
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="nav-user-profile rounded-circle"
                        width="30"
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>{user.name}</DropdownItem>
                      <DropdownItem
                        tag={RouterNavLink}
                        to="/Myaccount"
                        className="dropdown-profile"
                        activeClassName="router-link-exact-active"
                      >
                        <className/> Profile
                      </DropdownItem>
                      <DropdownItem
                        id="qsLogoutBtn"
                        onClick={() => logoutWithRedirect()}
                      >
                        <className/> Log
                        out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Nav>
              {!isAuthenticated && (
                <Nav className="d-md-none" navbar>
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      block
                      onClick={() => loginWithRedirect({})}
                    >
                      Log in
                    </Button>
                  </NavItem>
                </Nav>
              )}
              {isAuthenticated && (
                <Nav
                  className="d-md-none justify-content-between"
                  navbar
                  style={{ minHeight: 170 }}
                >
                  <NavItem>
                    <span className="user-info">
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="nav-user-profile d-inline-block rounded-circle mr-3"
                        width="30"
                      />
                      <h6 className="d-inline-block">{user.name}</h6>
                    </span>
                  </NavItem>
                  <NavItem>
                    <className/>
                    <RouterNavLink
                      to="/profile"
                      activeClassName="router-link-exact-active"
                    >
                      Profile
                    </RouterNavLink>
                  </NavItem>
                  <NavItem>
                    <className/>
                    <RouterNavLink
                      to="#"
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      Log out
                    </RouterNavLink>
                  </NavItem>
                </Nav>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }else{ //when don't log in
    return (
      <div className="nav-container">
        {isAuthenticated && userSet()}
        <Navbar expand="md" style={{ backgroundColor: "#000000" }}>
          <Container>
            <NavbarBrand className="logo" />
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
              <NavLink id="main-nav" href="/Home">HOME</NavLink>
                      <NavDropdown title="BOOK SWAP" id="collasible-nav-dropdown"
                      show={show}
                      onMouseEnter={showDropdown}
                      onMouseLeave={hideDropdown}
                      >
                          <NavDropdown.Item href="/" onClick={()=>loginWithRedirect()}>Post Books</NavDropdown.Item>
                          <NavDropdown.Item href="/" onClick={()=>loginWithRedirect()}>Search Books</NavDropdown.Item>
                          <NavDropdown.Item href="/" onClick={()=>loginWithRedirect()}>Manage Requests</NavDropdown.Item>
                      </NavDropdown>
                      <NavLink id="main-nav" href="/" onClick={()=>loginWithRedirect()}>MY ACCOUNT</NavLink>
                      <NavLink id="main-nav" href="/Cservice">Q&A</NavLink>
                      {isAuthenticated && (
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/external-api"
                      exact
                      activeClassName="router-link-exact-active"
                    >
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
              <Nav className="d-none d-md-block" navbar>
                {!isAuthenticated && (
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      onClick={() => loginWithRedirect({ action: 'signup' })}
                    >
                      Sign Up
                    </Button>
                  </NavItem>
                )}
                {isAuthenticated && (
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/external-api"
                      exact
                      activeClassName="router-link-exact-active"
                    >

                    </NavLink>
                  </NavItem>
                )}
              </Nav>
              <Nav className="d-none d-md-block" navbar>
                {!isAuthenticated && (
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      onClick={()=>loginWithRedirect()}
                    >
                      Log in
                    </Button>
                  </NavItem>
                )}
                {isAuthenticated && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret id="profileDropDown">
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="nav-user-profile rounded-circle"
                        width="30"
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>{user.name}</DropdownItem>
                      <DropdownItem
                        tag={RouterNavLink}
                        to="/Myaccount"
                        className="dropdown-profile"
                        activeClassName="router-link-exact-active"
                      >
                        <className/> Profile
                      </DropdownItem>
                      <DropdownItem
                        id="qsLogoutBtn"
                        onClick={() => logoutWithRedirect()}
                      >
                        <className/> Log
                        out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Nav>
              {!isAuthenticated && (
                <Nav className="d-md-none" navbar>
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      block
                      onClick={() => loginWithRedirect({})}
                    >
                      Log in
                    </Button>
                  </NavItem>
                </Nav>
              )}
              {isAuthenticated && (
                <Nav
                  className="d-md-none justify-content-between"
                  navbar
                  style={{ minHeight: 170 }}
                >
                  <NavItem>
                    <span className="user-info">
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="nav-user-profile d-inline-block rounded-circle mr-3"
                        width="30"
                      />
                      <h6 className="d-inline-block">{user.name}</h6>
                    </span>
                  </NavItem>
                  <NavItem>
                    <className/>
                    <RouterNavLink
                      to="/profile"
                      activeClassName="router-link-exact-active"
                    >
                      Profile
                    </RouterNavLink>
                  </NavItem>
                  <NavItem>
                    <className/>
                    <RouterNavLink
                      to="#"
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      Log out
                    </RouterNavLink>
                  </NavItem>
                </Nav>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
