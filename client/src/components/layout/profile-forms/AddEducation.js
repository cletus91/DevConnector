import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addEducation } from '../../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		current: false,
		to: '',
		description: '',
	});

	const {
		school,
		degree,
		fieldofstudy,
		from,
		current,
		to,
		description,
	} = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(formData, history);
	};

	return (
		<Fragment>
			<section className='container'>
				<h1 className='large text-primary'>Add Your Education</h1>
				<p className='lead'>
					<i className='fas fa-graduation-cap' /> Add any school,
					bootcamp, etc that you have attended
				</p>
				<small>* = required field</small>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* School or Bootcamp'
							name='school'
							value={school}
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* Degree or Certificate'
							name='degree'
							value={degree}
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Field Of Study'
							name='fieldofstudy'
							value={fieldofstudy}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<h4>From Date</h4>
						<input
							type='date'
							name='from'
							value={from}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<p>
							<input
								type='checkbox'
								name='current'
								checked={current}
								value={current}
								onChange={(e) => {
									setFormData({
										...formData,
										current: !formData.current,
									});
								}}
							/>{' '}
							Current School or Bootcamp
						</p>
					</div>
					<div className='form-group'>
						<h4>To Date</h4>
						<input
							type='date'
							name='to'
							value={to}
							onChange={onChange}
							disabled={current}
						/>
					</div>
					<div className='form-group'>
						<textarea
							name='description'
							cols='30'
							rows='5'
							placeholder='Program Description'
							value={description}
							onChange={onChange}
						/>
					</div>
					<input type='submit' className='btn btn-primary my-1' />
				</form>
			</section>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(
	withRouter(AddEducation)
);
