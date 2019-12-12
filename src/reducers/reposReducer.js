import {
  FETCH_REPOS_BEGIN,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE
} from "../actions/index";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function reposReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_REPOS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.repos
      };

    case FETCH_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}
