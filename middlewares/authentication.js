'use strict';

const jwt = require('jsonwebtoken');

const auth = async (request, h) => {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return h.response({ error: 'No token provided' }).code(401).takeover();
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return h.response({ error: 'Invalid token format' }).code(401).takeover();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.auth = decoded; 

        return h.continue;
    } catch (err) {
        return h.response({ error: 'Invalid or expired token' }).code(401).takeover();
    }
};

module.exports = auth;
