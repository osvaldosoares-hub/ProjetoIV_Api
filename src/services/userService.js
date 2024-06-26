const ModulesUser = require('../models/userModels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CreateUser = async (newuser)=>{
    const user = new ModulesUser(newuser);
    await user.save();
    return user;
}
const UserLogin = async (user)=>{
    const {email, password}  = user 
    const findUser = await ModulesUser.findOne({email});
    
    if(!findUser){
        return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }
    const token = generateToken(findUser);
    
    return { token };
    
}
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, "seu-segredo-jwt", {
      expiresIn: "1h",
    });
  };
module.exports={
    CreateUser,
    UserLogin
}