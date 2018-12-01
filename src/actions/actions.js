import axios from "axios";
import {
  USER_DETAILS_HAS_ERROR,
  USER_DETAILS_IS_LOADING,
  FETCH_USER_DETAILS_SUCCESS,
  USER_REPOS_IS_LOADING,
  USER_REPOS_HAS_ERROR,
  FETCH_USER_REPOS_SUCCESS
} from "./type";

// ACTION CREATOR

// For User details
export const userDetailsHasError = hasError => {
  return {
    type: USER_DETAILS_HAS_ERROR,
    hasError
  };
};

export const userDetailsIsLoading = isLoading => {
  return { type: USER_DETAILS_IS_LOADING, isLoading };
};

export const fetchUserDetailsSuccess = info => {
  return {
    type: FETCH_USER_DETAILS_SUCCESS,
    info
  };
};

// For User Repos
export const userReposHasError = hasError => {
  return { type: USER_REPOS_HAS_ERROR, hasError };
};

export const userReposIsLoading = isLoading => {
  return { type: USER_REPOS_IS_LOADING, isLoading };
};

export const fetchUserRepoSuccess = repos => {
  return {
    type: FETCH_USER_REPOS_SUCCESS,
    repos
  };
};

// Thunk action creator

export const fetchUserDetails = url => {
  return (dispatch, getState) => {
    dispatch(userDetailsIsLoading(true));
    axios
      .get(url)
      .then(response => {
        dispatch(userDetailsIsLoading(false));
        dispatch(fetchUserDetailsSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(userDetailsHasError(true));
      });
  };
};

export const fetchUserRepos = url => {
  return (dispatch, getState) => {
    dispatch(userReposIsLoading(true));
    axios
      .get(url)
      .then(response => {
        dispatch(userReposIsLoading(false));
        dispatch(fetchUserRepoSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(userReposHasError(true));
      });
  };
};
