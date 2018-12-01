import React, { Component } from "react";
import UserDetails from "./UserDetails";
import UserRepo from "./UserRepo";
import { Tabs, TabList, Tab, TabPanel } from "../Tabs";
import { connect } from "react-redux";
import { fetchUserDetails } from "../../actions/actions";
class UserContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserDetails(
      `https://api.github.com/users/${this.props.userName}`
    );
  }

  render() {
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col col-md-4 col-lg-3 pr-md-3">
              <UserDetails userDetails={this.props.userDetails} />
            </div>
            <div className="col col-md-8 col-lg-9 pl-md-2">
              <Tabs selected={1}>
                <TabList>
                  <Tab>Overviews</Tab>
                  <Tab>
                    Repositories{" "}
                    {!this.props.userDetails.isLoading && (
                      <span className="counter">
                        {this.props.userDetails.info.public_repos}
                      </span>
                    )}
                  </Tab>
                  <Tab>Stars</Tab>
                  <Tab>
                    Followers{" "}
                    {!this.props.userDetails.isLoading && (
                      <span className="counter">
                        {this.props.userDetails.info.followers}
                      </span>
                    )}
                  </Tab>
                  <Tab>
                    Following{" "}
                    {!this.props.userDetails.isLoading && (
                      <span className="counter">
                        {this.props.userDetails.info.following}
                      </span>
                    )}
                  </Tab>
                </TabList>

                <TabPanel>
                  <UserRepo userName={this.props.userName} />
                </TabPanel>
                <TabPanel>
                  <UserRepo userName={this.props.userName} />
                </TabPanel>
                <TabPanel>
                  <UserRepo userName={this.props.userName} />
                </TabPanel>
                <TabPanel>
                  <UserRepo userName={this.props.userName} />
                </TabPanel>
                <TabPanel>
                  <UserRepo userName={this.props.userName} />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
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
)(UserContainer);
