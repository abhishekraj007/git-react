import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserDetails } from "../actions/actions";

class UserProfile extends Component {
  componentDidMount() {
    // this.fetchData("https://api.github.com/users/abhishekraj007");
    // console.log(this.state);
    this.props.fetchUserDetails("https://api.github.com/users/abhishekraj007");
    console.log(this.props);
  }

  render() {
    if (this.props.userDetails.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.userDetails.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <div>
        <img src={this.props.userDetails.info.avatar_url} />

        {this.props.userDetails.info.name}

        <pre>{JSON.stringify(this.props.userDetails.info)}</pre>
      </div>
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
)(UserProfile);
