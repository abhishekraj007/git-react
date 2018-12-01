import { combineReducers } from "redux";
import {
  USER_DETAILS_HAS_ERROR,
  USER_DETAILS_IS_LOADING,
  FETCH_USER_DETAILS_SUCCESS,
  USER_REPOS_IS_LOADING,
  USER_REPOS_HAS_ERROR,
  FETCH_USER_REPOS_SUCCESS
} from "../actions/type";

const userDetails = (
  state = { hasError: false, isLoading: true, info: {} },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_HAS_ERROR:
      return {
        ...state,
        hasError: action.hasError
      };
    case USER_DETAILS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        info: action.info
      };

    default:
      return state;
  }
};

const userRepos = (
  state = { hasError: false, isLoading: true, repos: [] },
  action
) => {
  switch (action.type) {
    case USER_REPOS_HAS_ERROR:
      return {
        ...state,
        hasError: action.hasError
      };
    case USER_REPOS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case FETCH_USER_REPOS_SUCCESS:
      return {
        ...state,
        repos: action.repos
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userDetails,
  userRepos
});

export default rootReducer;
