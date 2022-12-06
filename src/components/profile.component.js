import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      refreshTokenMessage: false,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  onButtonClickRefreshToken = () => {
    AuthService.refreshAccessToken();
    this.setState({refreshTokenMessage: true});
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.access.substring(0, 20)} ...{" "}
          {currentUser.access.substr(currentUser.access.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        {/* Button to refresh user token */}
        {this.state.refreshTokenMessage && <p>Token Atualizado!</p>}
        <button
          className="btn btn-primary btn-block"
          onClick={this.onButtonClickRefreshToken}
        >Refresh Acess Token</button>
        </div>: null}
      </div>
    );
  }
}