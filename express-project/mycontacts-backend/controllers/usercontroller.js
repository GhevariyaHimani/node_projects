//3
const asynchandler = require("express-async-handler");
const users = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/contactroute");

//@desc register a user
//@route post /api/user/registration
//@accress public 

//5
const registeruser = asynchandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mendatory !! ");
    }

    const useravailable = await users.findOne({email})
    if(useravailable) {
        res.status(400);
        throw new Error("user already exits !! ");
    }

    // create HASH password      hash(raw password,)         this is stored in database, helps the security of users password 
    const hashpassword = await bcrypt.hash(password, 10);   
    // console.log(hashpassword)   // $2b$10$6r/5nkc92.EtxIzOrIn/quuqzQyNUV2jBgBW4gyErESAWzB0IqWqu
    const user = await users.create({
        username,
        email,
        password: hashpassword,
    });

    // console.log(`user created  ${user}`)
    // console.log(user.id);
    
    if(user) {
        res.status(201).json({_id: user.id, email : user.email});   //give id and email of exist username
    } else {
        res.status(400);
        throw new Error("user data is not valid");
    }
    // res.json({message : "register the user"});
});


//@desc login a user
//@route post /api/user/login
//@accress public 

const loginuser = asynchandler(async (req, res) => {
    const {email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const user = await users.findOne({email});

    // compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password))){
        //create access token
        const accessToken = jwt.sign({
            user :{
                username : user.username,
                email : user.email,
                id : user.id,
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,     //access tocken secret
        {expiresIn : "15m"}    //EXPIRE TIME OF TOCKEN
    )    
        res.status(200).json({accessToken});     //accesstoken in response
    } else {
        res.status(401);
        throw new Error("email and password is not valid");
    }
    // res.json({message : "login the user"})
})

//@desc current user
//@route post /api/user/current
//@accress private 

const currentuser = asynchandler(async (req, res) => {

    res.json(req.user)
})

module.exports = {registeruser, loginuser, currentuser}