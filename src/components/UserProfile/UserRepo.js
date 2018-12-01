import React, { Component } from "react";
import "./UserRepo.scss";
import { connect } from "react-redux";
import { fetchUserRepos } from "../../actions/actions";
import moment from "moment";
import FontAwesome from "react-fontawesome";
import ButtonDropdown from "../ButtonDropdown";
import UserRepoPlaceholder from "./UserRepoPlaceholder";

class UserRepo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repoTypeSelected: "all",
      repoLanguageSelected: "all",
      repoType: [
        { id: 0, title: "All", name: "all", selected: true, key: "repoType" },
        {
          id: 1,
          title: "Sources",
          name: "sources",
          selected: false,
          key: "repoType"
        },
        {
          id: 2,
          title: "Forks",
          name: "forks",
          selected: false,
          key: "repoType"
        },
        {
          id: 3,
          title: "Archived",
          name: "archived",
          selected: false,
          key: "repoType"
        },
        {
          id: 4,
          title: "Mirrors",
          name: "mirros",
          selected: false,
          key: "repoType"
        }
      ],
      repoLanguage: [
        {
          id: 0,
          title: "All",
          name: "all",
          selected: true,
          key: "repoLanguage"
        }
      ],
      repos: []
    };

    // this.onSelectTypeChange = this.onSelectTypeChange.bind(this);
    // this.resetThenSet = this.resetThenSet.bind(this);
  }

  languageColors = {
    javascript: "#f1e05a",
    css: "#563d7c",
    html: "#e34c26"
  };

  componentDidMount() {
    // this.fetchData("https://api.github.com/users/supreetsingh247");
    this.props.fetchUserRepos(
      `https://api.github.com/users/${
        this.props.userName
      }/repos?page=1&per_page=15`
    );
  }

  componentWillReceiveProps(nextProps, prevState) {
    // If data is available from server then store
    if (!nextProps.userRepos.isLoading) {
      // Get all languages this user's repos have
      // console.log("data has been loaded");
      let repoLanguage = nextProps.userRepos.repos.map(repo => {
        if (repo.language !== null && repo.language !== undefined) {
          return repo.language;
        }
      });

      // Get unique repo from repoLanguage
      let uniqueRepoLanguage = Array.from(new Set(repoLanguage));

      // Remove undefined from uniqueRepo
      uniqueRepoLanguage = uniqueRepoLanguage.filter(element => {
        return element !== undefined;
      });

      // Create an array for lanuage dropdown
      uniqueRepoLanguage = uniqueRepoLanguage.map((element, index) => {
        if (element !== undefined) {
          return {
            id: ++index,
            title: element,
            name: element.toLowerCase(),
            selected: false,
            key: "repoLanguage"
          };
        }
      });

      // Add this array to with previews 'all' item in  language dropdown
      uniqueRepoLanguage = this.state.repoLanguage.concat(uniqueRepoLanguage);

      // Finally store all repo and language dropdown by updating its states for search and filter

      if (nextProps.userRepos.repos.length > 0) {
        this.setState({
          ...this.state,
          repos: nextProps.userRepos.repos,
          repoLanguage: uniqueRepoLanguage
        });
      }
    }
  }

  // Sort repo by date
  sortedRepos = () => {
    let sortedRepos = this.state.repos.sort((a, b) => {
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });

    return sortedRepos;
  };

  // Filter dropdown handler
  resetThenSet = (title, id, key) => {
    if (key === "repoType") {
      this.filterByType(title.toLowerCase());
    }

    if (key === "repoLanguage") {
      this.filterByLangauage(title.toLowerCase());
    }

    let dropdownItems = JSON.parse(JSON.stringify(this.state[key]));
    // console.log(id);
    dropdownItems.forEach(item => (item.selected = false));
    dropdownItems[id].selected = true;
    this.setState({
      [key]: dropdownItems
    });
  };

  // Filter by repo type
  filterByType = value => {
    let newRepos = [];

    switch (value) {
      case "all":
        this.setState({
          ...this.state,
          repos: this.props.userRepos.repos
        });
        break;
      case "sources":
        newRepos = this.props.userRepos.repos.filter(repo => {
          return repo.fork === false;
        });
        this.setState({
          ...this.state,
          repos: newRepos
        });
        break;
      case "forks":
        newRepos = this.props.userRepos.repos.filter(repo => {
          return repo.fork === true;
        });
        this.setState({
          ...this.state,
          repos: newRepos
        });
        break;
      case "archived":
        newRepos = this.props.userRepos.repos.filter(repo => {
          return repo.archived === true;
        });
        this.setState({
          ...this.state,
          repos: newRepos
        });
        break;
      case "mirrors":
        newRepos = this.props.userRepos.repos.filter(repo => {
          return repo.mirror_url !== null;
        });
        this.setState({
          ...this.state,
          repos: newRepos
        });
        break;

      default:
        this.setState({ ...this.state, repos: this.props.userRepos.repos });
    }
  };

  // Filter by language
  filterByLangauage = name => {
    let newRepos = [];

    switch (name) {
      case "all":
        this.setState({
          ...this.state,
          repos: this.props.userRepos.repos
        });
        break;
      case "html":
        newRepos = this.props.userRepos.repos.filter(repo => {
          if (repo.language) {
            return repo.language.toLowerCase() === "html";
          }
        });
        this.setState({
          ...this.state,
          repos: newRepos
        });
        break;
      case "javascript":
        newRepos = this.props.userRepos.repos.filter(repo => {
          if (repo.language) {
            return repo.language.toLowerCase() === "javascript";
          }
        });
        this.setState({
          ...this.state,
          repos: newRepos
        });
        break;
      case "css":
        console.log(name);
        console.log("css selected");
        newRepos = this.props.userRepos.repos.filter(repo => {
          if (repo.language) {
            return repo.language.toLowerCase() === "css";
          }
        });
        this.setState({
          ...this.state,
          repos: newRepos
        });
        break;

      default:
        this.setState({ ...this.state, repos: this.props.userRepos.repos });
    }
  };

  // Repos search box implementation
  searchRepo = e => {
    let searchedRepo = this.props.userRepos.repos.filter(repo => {
      return repo.name.includes(e.target.value);
    });

    this.setState({ ...this.state, repos: searchedRepo });
  };

  // Repo search box Layout
  renderRepoSearchBox = () => {
    return (
      <form id="repo-search-form" className="repo-search-form">
        <input
          className="input search"
          type="text"
          onChange={this.searchRepo}
          placeholder="Find a repository..."
        />
      </form>
    );
  };

  // Repo updated time layout
  renderRepoUpdatedTime = repo => {
    let updatedTime = moment(repo.pushed_at).fromNow();
    let isMonthAgo = moment(repo.pushed_at).isBefore(new Date(), "month");
    if (isMonthAgo) {
      updatedTime = moment(repo.pushed_at).format("ll");
      return (
        <span className="hidden-xs mr-3 text-gray">
          Updated on {updatedTime}
        </span>
      );
    }
    return (
      <span className="hidden-xs mr-3 text-gray">Updated {updatedTime}</span>
    );
  };

  // Generate repo list
  renderRepoList = () => {
    if (this.state.repos.length > 0) {
      return (
        <div>
          <ul className="user-repo-list list-style-none">
            {this.sortedRepos().map(repo => {
              let languageColor = "#999";
              if (repo.language) {
                languageColor = this.languageColors[
                  repo.language.toLowerCase()
                ];
              }
              return (
                <li key={repo.name} className="user-repo-item">
                  {/* Name and link */}
                  <h2 className="user-repo-name mb-1">
                    <a href={repo.html_url} className="link" target="_blank">
                      {repo.name}
                    </a>
                  </h2>
                  {/* Name and link */}
                  {repo.description && (
                    <p className="text-gry mb-4">{repo.description}</p>
                  )}

                  {/* Language */}
                  <div className="d-flex fnt-sm">
                    {repo.language && (
                      <div>
                        <span
                          className="language-color mr-1"
                          style={{ backgroundColor: languageColor }}
                        />
                        <span className="mr-3 text-gray">{repo.language}</span>
                      </div>
                    )}
                    {/* Number of stargazers */}
                    {repo.stargazers_count > 0 && (
                      <a
                        href={repo.html_url + "/stargazers"}
                        className="text-gray"
                        target="_blank"
                      >
                        <FontAwesome name="star" className="mr-1" />
                        <span className="mr-3">{repo.stargazers_count}</span>
                      </a>
                    )}
                    {/* Number of forks */}
                    {repo.forks_count > 0 && (
                      <a
                        href={repo.html_url + "/network"}
                        className="text-gray"
                        target="_blank"
                      >
                        <FontAwesome name="code-fork" className="mr-1" />
                        <span className="mr-3">{repo.forks_count}</span>
                      </a>
                    )}
                    {/* Licence */}
                    {repo.license && (
                      <div className="text-gray">
                        <FontAwesome name="code-fork" className="mr-1" />
                        <span className="mr-3">{repo.license.name}</span>
                      </div>
                    )}
                    {/* Updated at */}
                    {this.renderRepoUpdatedTime(repo)}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  // Main Render function
  render() {
    if (this.props.userRepos.isLoading) {
      return <UserRepoPlaceholder />;
    }
    return (
      <div>
        <div className="d-flex repo-actions">
          {this.renderRepoSearchBox()}

          <div className="d-flex">
            <div className="mr-2">
              <ButtonDropdown
                label="Type"
                selectedValue="all"
                list={this.state.repoType}
                resetThenSet={this.resetThenSet}
              />
            </div>
            <ButtonDropdown
              label="Language"
              selectedValue="all"
              list={this.state.repoLanguage}
              resetThenSet={this.resetThenSet}
            />
          </div>
        </div>
        <div className="repo-search-info">
          {this.state.repos.length} repo found
        </div>
        <div className="user-repository">{this.renderRepoList()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userRepos: state.userRepos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserRepos: url => {
      return dispatch(fetchUserRepos(url));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRepo);
