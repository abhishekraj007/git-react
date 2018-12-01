import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserDetails } from "../../actions/actions";
import logo from "../../github-logo.svg";
import userAvatar from "../../user.png";
import iconNotification from "../../icon-notification.svg";
import iconAdd from "../../icon-add.svg";
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.renderAvatar = this.renderAvatar.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserDetails("https://api.github.com/users/supreetsingh247");
  }

  navToggler(e) {
    document.querySelector("body").classList.toggle("body-fixed");
    document.querySelector(".header-nav").classList.toggle("show");
  }

  renderAvatar() {
    if (this.props.userDetails.isLoading) {
      return <img className="user-avatar" src={userAvatar} alt="avatar" />;
    } else {
      return (
        <img
          className="user-avatar"
          src={this.props.userDetails.info.avatar_url}
          alt="loaded avatar"
        />
      );
    }
  }

  render() {
    return (
      <header className="header">
        <div className="container nav-container">
          <div className="nav-toggler" onClick={this.navToggler}>
            <span className="nav-toggler__bar" />
            <span className="nav-toggler__bar" />
            <span className="nav-toggler__bar" />
          </div>
          <a href="javscript:void(0)" className="header-logo">
            <img src={logo} className="header-logo__img" alt="Logo" />
          </a>
          <nav className="header-nav">
            <div className="nav-left">
              <form className="header-search">
                <input
                  className="input header-search__input search search--sm"
                  type="text"
                  placeholder="Search or jump for"
                />
              </form>
              <ul className="list nav-list ml-lg-1">
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    Pull Requests
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    Issues
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    Marketplace
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    Explore
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-right">
              <ul className="list nav-list">
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <img
                      className="nav-icon nav-link"
                      src={iconNotification}
                      alt="Notification"
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <img
                      className="nav-icon nav-link"
                      src={iconAdd}
                      alt="Add New"
                    />
                    <span className="arrow-down white sm" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:voidd(0)">
                    {this.renderAvatar()}
                    <span className="arrow-down white sm" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.userDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserDetails: url => {
      return dispatch(fetchUserDetails(url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
