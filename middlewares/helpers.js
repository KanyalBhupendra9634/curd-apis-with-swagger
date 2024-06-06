const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken')
const invalidatedTokens = require('../models/invalidatedTokens.model.js')
async function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    try{
        if (!token) {
            return res.status(403).send({ error: true, message: 'No token provided' });
        }

        const isInvalidatedToken = await invalidatedTokens.exists({ token });
        if (isInvalidatedToken) throw new Error('Token has been invalidated, try to generate a new token by logging again.');

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send({ error: true, message: 'Failed to authenticate token' });
            }
            req.user = decoded;
            next();
        });
    }catch (error) {
        res.status(500).json({ error,message:error.message});
    }
    
}

module.exports={verifyToken}