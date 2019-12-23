import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { connect } from "react-redux";
import { getUser, saveUser } from "../services/userService";

class AddUser extends Form {
  state = {
    data: { email: "", password: "", name: "", role: "" },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(8)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    role: Joi.string()
      .min(3)
      .required()
  };
  async populateUser() {
    try {
      const userId = this.props.match.params.id;
      if (userId === "new") return;

      const { data: user } = await getUser(userId);
      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateUser();
  }
  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      password: user.password,
      email: user.email,
      role: user.role
    };
  }
  doSubmit = async () => {
    try {
      await saveUser(this.state.data);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  role = [
    {
      name: "Admin",
      value: "admin"
    },
    {
      name: "Normal User",
      value: "user"
    }
  ];
  render() {
    let { currentUser:user } = this.props;
    if (user) {
      for (var a in user) {
        if (a === "user") {
          user = user[a];
        }
      }
    }
    const { _id } = this.state.data;
   
    return (
      <div>
        {user ? (
          user.role === "Admin" || user._id === _id ? (
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.props.match.params.id !== "new"
                ? ""
                : this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {user.role === "Admin"
                ? this.renderSelect("role", "Role", this.role)
                : ""}
              {this.renderButton("Submit")}
            </form>
          ) : (
            "You do not have enough permission !"
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(AddUser);
