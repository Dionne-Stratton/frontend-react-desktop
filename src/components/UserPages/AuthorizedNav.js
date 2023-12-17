import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/RabbiRabbitLogo2.png";
import AccountIcon from "../../assets/account-icon.png";

const HeaderNav = (props) => {
  const { setAuth } = props;

  return (
    <div className="headernav">
      <header>
        <div className="header-title">
          <img className="logo" src={Logo} alt="Rabbi Rabbit Logo" />
          <div className="auth-nav">
            <NavLink to="/account">
              <img
                width={50}
                className="account-icon"
                src={AccountIcon}
                alt="Account"
              />
            </NavLink>
            <NavLink
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                setAuth(false);
              }}
            >
              Logout
            </NavLink>
          </div>
        </div>

        <nav id="hnavbuttons">
          <NavLink className="main-nav" activeClassName="active" to="/">
            Dashboard
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/vocab">
            Vocabulary
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/study">
            Study
          </NavLink>
          <NavLink className="main-nav" activeClassName="active" to="/library">
            Library
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
