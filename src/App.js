import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect, Router } from "react-router-dom";
import { connect } from "react-redux";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import LoginForm from "./components/login";
import Logout from "./components/logout";
import AddUser from "./components/addUser";
import User from "./components/user";
import { setCurrentUser } from "./Redux/user/user-action";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const { setCurrentUser } = this.props;
    const user = auth.getCurrentUser();

    setCurrentUser({ user });
  }
  render() {
    return (
      <React.Fragment>
          <NavBar />
          <main className="container">
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <ProtectedRoute path="/user/:id" component={AddUser} />
              <ProtectedRoute exact path="/" component={User} />
              <Route exact path="/logout" component={Logout} />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </main>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(null, mapDispatchToProps)(App);
