import React from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

class ReposList extends React.Component {
  render() {
    const { repos } = this.props;
    return (
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Repo name</th>
					</tr>
				</thead>
				<tbody>
					{repos.map((repo, i) => (
						<tr key={i}>
							<td>{++i}</td>
							<td><Link to={`/${repo.name}`} >{repo.name}</Link></td>
						</tr>
					))}
				</tbody>
			</Table>
    );
  }
}

export default ReposList;
