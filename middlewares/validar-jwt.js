const { response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const validarJWT = async( req, res = response, next ) => {

    const token = req.header('x-token')

    if( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        })
    }

    try {
        
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED )

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
    
    next();
}

module.exports = {
    validarJWT
}