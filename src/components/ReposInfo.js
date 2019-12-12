import React from "react";
import Spinner from './Spinner';
import Table from 'react-bootstrap/Table';

import { withRouter } from 'react-router-dom';

const REPO_DETAILS_URL = "https://api.github.com/repos/"

class ReposInfo extends React.Component {
  state = {
    loading: true,
    nStargazers: 0,
    nSubscribers: 0,
    nForks: 0
  }

  componentDidMount() {
    const {full_name} = this.props.data;
    fetch(`${REPO_DETAILS_URL}${full_name}`)
      .then(res => res.json())
      .then(res => this.setState({ loading: false, nStargazers: res.stargazers_count, nSubscribers: res.subscribers_count, nForks: res.forks }))
  }

  goBack = () => {
    const { history } = this.props;
    if(history) history.goBack();
  }

  render (){
    const { name, description, html_url } = this.props.data;
    const { loading, nStargazers, nSubscribers, nForks } = this.state;
    
    return loading ? <Spinner /> : (
      <>
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td><p>Name</p></td>
              <td><a href={html_url} target="_blank" rel="noopener noreferrer">{name}</a></td>
            </tr>
            <tr>
              <td><p>Description</p></td>
              <td><p>{description}</p></td>
            </tr>
            <tr>
              <td><p>Number of stargazers</p></td>
              <td><p>{nStargazers}</p></td>
            </tr>
            <tr>
              <td><p>Number of watchers</p></td>
              <td><p>{nSubscribers}</p></td>
            </tr>
            <tr>
              <td><p>Forks</p></td>
              <td><p>{nForks}</p></td>
            </tr>
          </tbody>
        </Table>
        <button onClick={this.goBack}>Back</button>
      </>)
  }
}

export default withRouter(ReposInfo);
