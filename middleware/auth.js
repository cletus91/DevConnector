const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function(req, res, next) {
    // Get token from Header

    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorized denied' });
    }
    // Verify Token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Verify if user exists
        const user = await User.findById(decoded.user.id);
        if (!user) {
          return res.status(401).json({ msg: 'Token is not valid || user does not exist' });
        }

        req.user = decoded.user;
        next();

    } catch(err) {
        return res.status(401).json({ msg: 'Token not valid' })
    }

    
}