import React from "react";
import { connect } from "react-redux";
import compose from "compose";
import { Link, NavLink, BrowserRouter, withRouter } from "react-router-dom";

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
        <a className="navbar-brand" exact={true} href="/">
          Users UI
        </a>
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
                <a className="nav-item nav-link" href={`/user/${user._id}`}>
                  {"Edit Profile Mr." + user.name}
                </a>
                <a className="nav-item nav-link" href="/logout">
                  Logout
                </a>
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
export default compose(withRouter, connect(mapStateToProps))(NavBar);
