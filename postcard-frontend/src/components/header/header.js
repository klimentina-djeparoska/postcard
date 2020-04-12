import React from 'react';
import {Link} from "react-router-dom";
import './header.css';
import logo from '../../assets/postcard-logo.png';
import * as ROUTES from '../constants/routes';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


const Header = (props) => {
    return (
      <header>
          <Navbar expand="sm" className="menu-background border-bottom">
              <div className="d-flex flex-nowrap w-100">
                  <Link className="text-dark font-weight-bold brand-img" to={ROUTES.LANDING}><img className="img-logo" src={logo} alt="logo" />  Postcard</Link>
                  <Navbar.Toggle className="toggle-display" children="=" aria-controls="basic-navbar-nav" />
              </div>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto list-change">
                      {
                          props.user ?
                              [
                                  <Link key={"create"} className="mr-3 nav-item font-weight-bold nav-link text-dark item-line" to={ROUTES.CREATE_POSTCARD}>Create postcard</Link>,
                                  <Link key={"profile"} className="nav-item font-weight-bold nav-link text-dark item-line" to={ROUTES.USER_PROFILE}>My profile</Link>
                              ]
                              : <Link key={"login"} className="nav-item font-weight-bold nav-link text-dark item-line" to={ROUTES.SIGN_IN}>Login</Link>
                      }
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
      </header>
    );
};

export default Header;
