import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/RabbiRabbitLogo2.png";

const HeaderNav = () => {
  return (
    <div className="headernav">
      <header>
        <div className="header-title">
          <img className="logo" src={Logo} alt="Rabbi Rabbit Logo" />
          <div className="auth-nav">
            <NavLink
              className="main-nav"
              activeClassName="active"
              to="/auth/login"
            >
              Login
            </NavLink>
            <NavLink
              className="main-nav"
              activeClassName="active"
              to="/auth/register"
            >
              Register
            </NavLink>
          </div>
        </div>

        <nav id="hnavbuttons">
          <NavLink className="main-nav" activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/about">
            About
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/features">
            Features
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/pricing">
            Pricing
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/help">
            Help
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default HeaderNav;
