import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import PrivateRoute from '../routing/PrivateRoute';
import Dashboard from '../dashboard/Dashboard';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import CreateProfile from '../layout/profile-forms/CreateProfile';
import EditProfile from '../layout/profile-forms/EditProfile';
import AddExperience from '../layout/profile-forms/AddExperience';
import AddEducation from '../layout/profile-forms/AddEducation';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';

function Routes() {
	return (
		<section className='container'>
			<Alert />
			<Switch>
				<Route exact path='/register' component={Register}></Route>
				<Route exact path='/login' component={Login}></Route>
				<Route exact path='/profiles' component={Profiles}></Route>
				<Route exact path='/profile/:id' component={Profile}></Route>
				<PrivateRoute exact path='/dashboard' component={Dashboard} />
				<PrivateRoute
					exact
					path='/create-profile'
					component={CreateProfile}
				/>
				<PrivateRoute
					exact
					path='/edit-profile'
					component={EditProfile}
				/>
				<PrivateRoute
					exact
					path='/add-experience'
					component={AddExperience}
				/>
				<PrivateRoute
					exact
					path='/add-education'
					component={AddEducation}
				/>
				<PrivateRoute exact path='/posts' component={Posts} />
				<PrivateRoute exact path='/posts/:id' component={Post} />
				<Route component={NotFound}></Route>
			</Switch>
		</section>
	);
}

export default Routes;
