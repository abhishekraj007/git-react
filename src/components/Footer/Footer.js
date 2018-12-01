import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-5">
        <div className="container">
          <div className="footer-wrapper border-top">
            <ul className="list footer-nav fnt-sm">
              <li>
                <span className="text-gray">&copy; 2018 Github Inc.</span>
              </li>
              <li>
                <a href="javascript:void(0)" className="link">
                  Privacy
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="link">
                  Security
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="link">
                  Status
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="link">
                  Help
                </a>
              </li>
            </ul>
            <a href="javascript:void(0)" className="footer-logo text-light">
              <FontAwesome name="github" />
            </a>
            <ul className="list footer-nav fnt-sm">
              <li>
                <a href="javascript:void(0)" className="link">
                  Contact Github
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="link">
                  Pricing
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="link">
                  API
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="link">
                  Training
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="link">
                  Blog
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="link">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
