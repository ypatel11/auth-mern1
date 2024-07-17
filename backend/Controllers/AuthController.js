const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/Users');


const signup = async(req, res)=> {
    try{
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({ Message: 'user already exits, Login', success: false});
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(210)
            .json({
                message: 'SignUp successfully',
                success: true
            })
    } catch(err) {
        res.status(500)
            .json({
                message: 'Internal server err',
                success: false
            })
    }
}

const login = async(req, res)=> {
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403)
                .json({ Message: 'Auth failed or email/password is wrong', success: false});
        }
        
const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({ Message: 'Auth failed or email/password is wrong', success: false});  
        }
const jwtToken = jwt.sign(
    {email: user.email, _id:user._id },
    process.env.JWT_SECRET,
    {expiresIn: '24h'}
)


        res.status(200)
            .json({
                message: 'Login successfully',
                success: true,
                jwtToken,
                email,
                name: user.name

            })
    } catch(err) {
        res.status(500)
            .json({
                message: 'Internal server err',
                success: false
            })
    }
}

module.exports={
    signup,
    login
}