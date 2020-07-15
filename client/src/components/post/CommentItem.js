import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
	postId,
	comment: { _id, user, text, name, avatar, date },
	auth,
	deleteComment,
}) => (
	<div className='post bg-white p-1 my-1'>
		<div>
			<Link to={`/profile/${user}`}>
				<img className='round-img' src={avatar} alt='' />
				<h4>{name}</h4>
			</Link>
		</div>
		<div>
			<p className='my-1'>{text}</p>
			<p className='post-date'>
				<Moment format='MM/DD/YY'>{date}</Moment>
			</p>
			{!auth.loading && user === auth.user._id && (
				<button
					onClick={() => deleteComment(postId, _id)}
					type='button'
					class='btn btn-danger'>
					<i class='fas fa-times'></i>
				</button>
			)}
		</div>
	</div>
);

CommentItem.propTypes = {
	auth: PropTypes.object.isRequired,
	postId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(
	CommentItem
);
