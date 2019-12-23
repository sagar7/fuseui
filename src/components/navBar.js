import React from "react";
import { connect } from "react-redux";

import { Link, NavLink, BrowserRouter } from "react-router-dom";

const NavBar = ({ currentUser: user }) => {
  if (user) {
    for (var a in user) {
      if (a === "user") {
        user = user[a];
      }
    }
  }

  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
      <BrowserRouter>
        <Link className="navbar-brand" to="/">
          Users UI
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav" style={{ cursor: "pointer" }}>
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to={`/user/${user._id}`}>
                  {"Edit Profile Mr." + user.name}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </BrowserRouter>
    </nav>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(NavBar);
