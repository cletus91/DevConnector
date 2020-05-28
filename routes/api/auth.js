const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const config = require('config');
const jwt = require('jsonwebtoken');

// @route    GET api/auth
// @desc     Test route
// @access   Public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user); 
    } catch(err) {
        return res.status(500).send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Authentic user & get token
// @access   Public
router.post(
    "/",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Password is required").exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password } = req.body;
  
      try {
          let user = await User.findOne({ email });
  
          if(!user) {
            return res.status(500).json({ errors: [{ msg: 'Invalid Credentials'}] });
          }
  
          const isMatch = await bcrypt.compare(password, user.password);

          if(!isMatch) {
            return res.status(500).json({ errors: [{ msg: 'Invalid Credentials'}] });
          }
  
          const payload = {
              user: {
              id: user.id
              }
          }
  
          jwt.sign(
              payload, 
              config.get('jwtSecret'),
              {  expiresIn: 36000 },
              (err, token) => {
                  if(err) throw err;
                  res.json({ token });
              }
              );
  
          //res.send("User registered");
          
      } catch(error) {
          console.log(error.msg);
          res.status(500).send('Server Error');
      }
  
      
    }
  );


module.exports = router;