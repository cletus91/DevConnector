const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const request = require('request');

// @route    GET api/profile/me
// @desc     GET current users profile
// @access   Private

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);
		if (!profile) {
			return res.status(400).json({ msg: 'No profile exist for this user' });
		}
		return res.json(profile);
	} catch (err) {
		console.log(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		//  Build profile object

		const profileFields = {};
		profileFields.user = req.user.id;

		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		//  Build social object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (facebook) profileFields.social.facebook = facebook;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;
		if (linkedin) profileFields.social.linkedin = linkedin;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				//  Update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}

			//  Create
			profile = new Profile(profileFields);
			await profile.save();
			return res.json(profile);
		} catch (err) {
			console.log(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [
			'name',
			'avatar',
			'email',
		]);
		return res.json(profiles);
	} catch (error) {
		console.log(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public

router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar', 'email']);
		if (!profile) {
			return res.status(500).json({ msg: 'There is no profile for this user' });
		}
		return res.json(profile);
	} catch (error) {
		if (error.kind == 'ObjectId') {
			return res.status(500).send('There is no profile for this user');
		}
		return res.status(500).send('Server Error: Invalid Object ID');
	}
});
// @route    DELETE api/profile
// @desc     delete profile
// @access   Private
router.delete('/', auth, async (req, res) => {
	try {
		await Profile.findOneAndRemove({ user: req.user.id });

		await User.findOneAndRemove({ _id: req.user.id });

		return res.json({ msg: 'User deleted' });
	} catch (error) {
		if (error) {
			return res.status(500).send('There is no profile for this user');
		}
		return res.status(500).send('Server Error');
	}
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('company', 'company is required').not().isEmpty(),
			check('from', 'from date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		} = req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (!profile) {
				return res
					.status(500)
					.json({ msg: 'There is no profile for this user' });
			}
			profile.experience.unshift(newExp);

			await profile.save();

			return res.json(profile);
		} catch (error) {
			console.log(error);
			return res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete profile experience
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		if (profile.experience) {
			profile.experience = profile.experience.filter(
				(item) => item.id.toString() !== req.params.exp_id.toString()
			);
		}

		await profile.save();

		return res.json(profile);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Server Error: No profile experience');
	}
});

// @route    PUT api/profile/Education
// @desc     Add profile education
// @access   Private
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'school is required').not().isEmpty(),
			check('degree', 'degree is required').not().isEmpty(),
			check('fieldofstudy', 'filed of study is required').not().isEmpty(),
			check('from', 'from date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, fieldofstudy, from, to, description } = req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (!profile) {
				return res
					.status(500)
					.json({ msg: 'There is no profile for this user' });
			}
			profile.education.unshift(newEdu);

			await profile.save();

			return res.json(profile);
		} catch (error) {
			console.log(error);
			return res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete profile education
// @access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		if (profile.education) {
			profile.education = profile.education.filter(
				(item) => item.id.toString() !== req.params.edu_id.toString()
			);
		}

		await profile.save();

		return res.json(profile);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send('Server Error: No profile education');
	}
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', (req, res) => {
	try {
		const options = {
			uri: encodeURI(
				`https://api.github.com/users/${req.params.username}/repos?per_page=5sort=created:asc`
			),
			method: 'GET',
			headers: {
				'user-agent': 'node.js',
				Authorization: `token ${config.get('githubToken')}`,
			},
		};

		request(options, (error, response, body) => {
			if (error) console.log(error);

			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'No github profile found' });
			}

			return res.json(JSON.parse(body));
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
