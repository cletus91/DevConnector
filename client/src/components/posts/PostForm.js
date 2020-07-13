import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
	const [text, setText] = useState('');

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Add a Post</h3>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text });
					setText('');
				}}
				className='form my-1'>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='What is on your mind?'
					value={text}
					onChange={(e) => setText(e.target.value)}
					required></textarea>
				<input
					type='submit'
					className='btn btn-dark my-1'
					value='Submit'
				/>
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.object.isRequired,
};

export default connect(null, { addPost })(PostForm);
