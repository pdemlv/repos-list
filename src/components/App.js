import React from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { Route} from "react-router-dom";
import { fetchRepos } from "../actions/index";

import Spinner from "./Spinner";
import ReposList from "./ReposList";
import ReposInfo from "./ReposInfo";

const ELEMENTS_LIMIT = 20;
const FETCH_URL = "https://api.github.com/repositories";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRepos(FETCH_URL));
  }
    
  render() {
    const { error, loading, repos } = this.props;
		let limitedRepos = repos.slice(0, ELEMENTS_LIMIT) || [];

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <Spinner />;
    }

		const limitedRoutes = limitedRepos.map((repo, i) => (
      <Route key={i} path={`/${repo.name}`}>
        <ReposInfo data={repo} />
      </Route>
    ))

    return (
      <Switch>
        {limitedRoutes}
        <Route path='/'>
          <ReposList repos={limitedRepos} />
        </Route>
      </Switch>
    );
  }
}
const mapStateToProps = state => {
  return {
    repos: state.reposReducer.items,
    loading: state.reposReducer.loading,
    error: state.reposReducer.error
  };
};

export default connect(mapStateToProps)(App);
