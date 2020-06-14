import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
	const [formData, setFormData] = useState({
		title: '',
		company: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisable, toggleDisable] = useState(false);

	const { title, company, location, from, to, current, description } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addExperience(formData, history);
	};

	return (
		<Fragment>
			<section className='container'>
				<h1 className='large text-primary'>Add An Experience</h1>
				<p className='lead'>
					<i className='fas fa-code-branch'></i> Add any developer/programming
					positions that you have had in the past
				</p>
				<small>* = required field</small>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* Job Title'
							name='title'
							value={title}
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* Company'
							name='company'
							value={company}
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Location'
							name='location'
							value={location}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<h4>From Date</h4>
						<input type='date' name='from' value={from} onChange={onchange} />
					</div>
					<div className='form-group'>
						<p>
							<input
								type='checkbox'
								name='current'
								checked={current}
								value={current}
								onChange={(e) => {
									setFormData({ ...formData, current: !current });
									toggleDisable(!toDateDisable);
								}}
							/>{' '}
							Current Job
						</p>
					</div>
					<div className='form-group'>
						<h4>To Date</h4>
						<input
							type='date'
							name='to'
							value={to}
							onChange={onChange}
							disabled={toDateDisable ? 'disabled' : ''}
						/>
					</div>
					<div className='form-group'>
						<textarea
							name='description'
							cols='30'
							rows='5'
							placeholder='Job Description'
							value={description}
							onChange={onChange}></textarea>
					</div>
					<input type='submit' className='btn btn-primary my-1' />
					<Link to='/dashboard' className='btn btn-light my-1'>
						Go Back
					</Link>
				</form>
			</section>
		</Fragment>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
