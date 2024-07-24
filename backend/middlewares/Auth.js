const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token)
    {
        return res.status(403).json({message: 'Unauthorized user. Access is denied.'})
    }

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch (e)
    {
        return res.status(403).json({message: 'Authentication error.', e})
    }
}

module.exports = ensureAuthenticated;