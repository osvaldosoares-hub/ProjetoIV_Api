const ServicesUser = require('../services/userService');
const bcrypt = require('bcrypt');

const CreateNewUser =async (req,res)=>{
    try{
        const { username,email, password} = req.body;

        if (!username || username.length === 0) {
            throw new Error("Username is required");
        }
        if (!email || email.length === 0) {
            throw new Error("email is required");
        }
          if (!password || password.length === 0) {
            throw new Error("Password is required");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const USER = {
            username: username,
            email:email,
            password:hashedPassword,
        }
        const newUser =await ServicesUser.CreateUser(USER);


        res.status(201).json(newUser);
    }catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
}

const LoginUser = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if (!email || email.length === 0) {
            throw new Error("Username is required");
        }
          if (!password || password.length === 0) {
            throw new Error("Password is required");
        }

        
        const { token } = await ServicesUser.UserLogin({email,password});
        
        res.status(201).json({token,status:200})
    }catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
}
module.exports = {
    CreateNewUser,
    LoginUser
}