import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExp = ({
	experience: {
		company,
		title,
		location,
		current,
		to,
		from,
		description,
	},
}) => (
	<div>
		<h3 className='text-dark'>{company}</h3>
		<p>
			<Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
			{current === true ? (
				'Now'
			) : (
				<Moment format='MM/DD/YYYY'>{to}</Moment>
			)}
		</p>
		<p>
			<strong>Position: </strong>
			{title}
		</p>
		<p>
			<strong>Description: </strong>
			{description}
		</p>
	</div>
);

ProfileExp.propTypes = {
	experience: PropTypes.object.isRequired,
};

export default ProfileExp;
