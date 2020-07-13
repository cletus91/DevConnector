import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEdu = ({
	education: {
		school,
		degree,
		fieldofstudy,
		current,
		to,
		from,
		description,
	},
}) => (
	<div>
		<h3 className='text-dark'>{school}</h3>
		<p>
			<Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
			{current === true ? (
				'Now'
			) : (
				<Moment format='MM/DD/YYYY'>{to}</Moment>
			)}
		</p>
		<p>
			<strong>Degree: </strong>
			{degree}
		</p>
		<p>
			<strong>Field Of Study: </strong>
			{fieldofstudy}
		</p>
		{description && (
			<p>
				<strong>Description: </strong>
				{description}
			</p>
		)}
	</div>
);
ProfileEdu.propTypes = {
	education: PropTypes.object.isRequired,
};

export default ProfileEdu;
