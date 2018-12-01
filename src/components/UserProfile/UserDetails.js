import React, { Component } from "react";
import userAvatar from "../../user.png";
import iconOrg from "../../icon-org.svg";
import iconLocation from "../../icon-location.svg";
import iconEmail from "../../icon-email.svg";
import "./UserDetails.scss";
import UserDetailsPlaceholder from "./UserDetailsPlaceholder";

class UserDetails extends Component {
  constructor(props) {
    super(props);
  }

  renderProfileImage = () => {
    if (this.props.userDetails.isLoading) {
      return (
        <img
          className="user-profile-image"
          src={userAvatar}
          alt="profile image"
        />
      );
    } else {
      return (
        <img
          className="user-profile-image"
          src={this.props.userDetails.info.avatar_url}
          alt="profile image"
        />
      );
    }
  };

  render() {
    if (this.props.userDetails.isLoading) {
      return <UserDetailsPlaceholder />;
    }
    return (
      <div className="user-profile">
        <div className="user-profile-header">
          {this.renderProfileImage()}
          <div>
            <h2 className="user-profile-name">
              {this.props.userDetails.info.name}
            </h2>
            <p className="user-profile-username">
              {this.props.userDetails.info.login}
            </p>
          </div>
        </div>
        <p className="user-profile-bio">{this.props.userDetails.info.bio}</p>
        <button className="button button--block mb-3">Follow</button>
        <a href="javascript:void(0)" className="link-plain fnt-sm mb-3">
          Block or report users
        </a>
        <div className="divider" />
        {this.props.userDetails.info.company && (
          <div className="d-flex mb-2">
            <img className="icon mr-2" src={iconOrg} alt="Org" />
            <span>{this.props.userDetails.info.company}</span>
          </div>
        )}
        {this.props.userDetails.info.location && (
          <div className="d-flex mb-2">
            <img className="icon mr-2" src={iconLocation} alt="Org" />
            <span>{this.props.userDetails.info.location}</span>
          </div>
        )}
        {this.props.userDetails.info.email && (
          <div className="d-flex mb-2">
            <img className="icon mr-2" src={iconEmail} alt="Org" />
            <span>{this.props.userDetails.info.email}</span>
          </div>
        )}
      </div>
    );
  }
}

export default UserDetails;
