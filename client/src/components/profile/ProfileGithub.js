import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../../components/layout/Spinner';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
	useEffect(() => {
		getGithubRepos(username);
	}, []);
	return (
		<div className='profile-github'>
			<h2 className='text-primary my-1'>
				<i className='fab fa-github'></i> Github Repos
			</h2>
			{repos === null ? (
				<Spinner />
			) : (
				repos.map((repo) => (
					<div key={repo.id} className='repo bg-white p-1 my-1'>
						<div>
							<h4>
								<a
									href={repo.html_url}
									target='_blank'
									rel='noopener noreferrer'>
									{repo.name}
								</a>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div>
							<ul>
								<li className='badge badge-dark'>
									Watchers: {repo.watchers_count}
								</li>
								<li className='badge badge-primary'>
									Stars: {repo.stargazers_count}
								</li>
								<li className='badge badge-light'>
									Forks: {repo.forks}
								</li>
							</ul>
						</div>
					</div>
				))
			)}
		</div>
	);
};

ProfileGithub.propTypes = {
	getGithubRepos: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	repos: PropTypes.array.isRequired,
};

const mapStateTProps = (state) => ({
	repos: state.profile.repos,
});

export default connect(mapStateTProps, { getGithubRepos })(
	ProfileGithub
);
