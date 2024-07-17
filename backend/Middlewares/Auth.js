const { request } = require('express');
const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
    console.log(request.headers);
    console.log(auth);
    if(!auth){
        return res.status(401)
            .json({message: 'Unauthorized, JWT token is required'});
    }

    try{
        const token = auth.split(' ')[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err){
        return res.status(401)
            .json({message: 'Unauthorized, JWT token is wrong / expired'});
    }
}

module.exports = ensureAuthenticated;