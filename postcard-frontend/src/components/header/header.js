import React from 'react';
import {Link} from "react-router-dom";
import './header.css';
import logo from '../../assets/postcard-logo.png';
import * as ROUTES from '../constants/routes';

const Header = (props) => {
    return (
      <header>
          <nav className="navbar navbar-expand-lg menu-background border-bottom" style={{"width": "100%"}}>
                <Link className="navbar-brand text-dark font-weight-bold" to={ROUTES.LANDING}><img className="img-logo" src={logo} alt="logo" />  Postcard</Link>

              <div style={{"width": "50%"}}>
                  <div  className="pull-right list-change">
                      <ul className="navbar-nav mr-auto">
                          {
                              props.user ?
                                  [
                                      <li key={"create"} className="nav-item mr-3 font-weight-bold"><Link className="nav-link text-dark" to={ROUTES.CREATE_POSTCARD}>Create postcard</Link></li>,
                                      <li key={"profile"} className="nav-item font-weight-bold"><Link className="nav-link text-dark" to={ROUTES.USER_PROFILE}>My profile</Link></li>
                                  ]
                                  : <li key={"login"} className="nav-item font-weight-bold"><Link className="nav-link text-dark" to={ROUTES.SIGN_IN}>Login</Link></li>
                          }
                      </ul>
                  </div>
              </div>

          </nav>
      </header>
    );
};

export default Header;
