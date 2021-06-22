const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const keys = require("../../keys");
const secret = keys.secret;
const User = require("../models/User");


class UserController{
    async create(req,res){
        const {name,email,password} = req.body;
        if (name == "" || email == "" || password == "") return res.status(400).json({message:"Field could not be blank ."});
        if (name == undefined || email == undefined || password == undefined ) return res.status(400).json({message:"Field could not be blank ."});
        if (!validator.validate(email)) return res.status(400).json({message:"Invalid email ."});
        if (password.length < 8) return res.status(400).json({message:"invalid password length ."});
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password,salt);
        try{
            const user = await User.findOne({"email":email});
            if(user)return res.status(400).json({message:"Email already in use ."});
            const newUser = await User({name,email,password:hash});
            await newUser.save();
            return res.status(201).json({email:email});
        }catch(error){
            return res.status(500);
        }
    }
}
module.exports = new UserController();