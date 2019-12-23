import React, { Component } from "react";
import { withRouter } from "react-router";
import UserTable from "./userTable";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as userService from "../services/userService";
import auth from "../services/authService";

class User extends Component {
  state = {
    users: []
  };
  async componentDidMount() {
    const { data } = await userService.getAllUser();
    this.setState({ users: data });
  }

  handleDelete = async user => {
    const originalUser = this.state.users;
    const users = originalUser.filter(m => m._id !== user._id);
    this.setState({ users });

    try {
      let { currentUser } = this.props;
      if (currentUser) {
        for (var a in currentUser) {
          if (a === "user") {
            currentUser = currentUser[a];
          }
        }
      }
      await userService.deleteMovie(user._id);
      if (user._id === currentUser._id) {
        auth.logout();
        window.location = "/login";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This user has already been deleted.");

      this.setState({ users: originalUser });
    }
  };
  render() {
    const { users } = this.state;
    let { currentUser: user } = this.props;
    if (user) {
      for (var a in user) {
        if (a === "user") {
          user = user[a];
        }
      }
    }
    return (
      <div>
        <h3>There are {users.length} users in our Database.</h3>
        {user ? (
          user.role === "Admin" ? (
            <Link to="/user/new">
              <button type="button" className="btn btn-primary">
                Add user
              </button>
            </Link>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <UserTable
          users={users}
          onDelete={this.handleDelete}
          currentUser={user}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
export default withRouter(connect(mapStateToProps)(User));
