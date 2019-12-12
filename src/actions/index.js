export const FETCH_REPOS_BEGIN = "FETCH_REPOS_BEGIN";
export const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS";
export const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE";

export const fetchReposBegin = () => ({
  type: FETCH_REPOS_BEGIN
});

export const fetchReposSuccess = repos => {
	return {
		type: FETCH_REPOS_SUCCESS,
		payload: { repos }
	}
};

export const fetchReposFailure = error => ({
  type: FETCH_REPOS_FAILURE,
  payload: { error }
});


function getRepos(url) {
  return fetch(url)
		.then(handleErrors)
		.then(res => res.json())
}

export function fetchRepos(url) {
  return dispatch => {
    dispatch(fetchReposBegin());
		return getRepos(url)
      .then(repos => {
        dispatch(fetchReposSuccess(repos));
        return repos;
      })
      .catch(error => dispatch(fetchReposFailure(error)));
  };
}

// Handle HTTP errors
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}





