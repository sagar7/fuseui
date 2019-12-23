import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";


class UserTable extends Component {
  columns = [
    {
      path: "user",
      label: "User",
      content: user => <Link to={`/user/${user._id}`}>{user.name}</Link>
    },
    { path: "email", label: "Email" },
    { path: "role", label: "Role" }
  ];
  deleteColumn = {
    key: "delete",
    content: user => (
      <button
        onClick={() => this.props.onDelete(user)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.role === "Admin") this.columns.push(this.deleteColumn);
  }
  render() {
    const { users } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        style={{ cursor: "pointer" }}
      />
    );
  }
}

export default UserTable;
