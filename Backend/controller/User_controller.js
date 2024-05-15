import User from "../model/User.js";
import  bcrypt  from "bcryptjs";
export const getalluser= async(req, res, next)=>
{
    let user;
    try
    {
        user= await User.find();
    }
    catch(err)
    {
        console.log(err)
    }
    if(!user)
    {
        return res.status(404).json({message: "User not found"});
    }
    // else
    // {
        return res.status(200).json({user});
    // }
}

export const signup= async(req, res, next)=>
{
    const {name, email, password, cpassword}= req.body;
    let existuser;
    try
    {
        existuser = await User.findOne({email});
    }
    catch(err)
    {
        console.log(err);
    }
    if(existuser)
    {
        return res.status(400).json({message: "User already exist"});
    }
    const hashpassword= bcrypt.hashSync(password);
    const user= new User({
        name,
        email,
        password : hashpassword,
        cpassword : hashpassword,
        blogs:[]
    })
    try{
        await user.save();
    }
    catch(err)
    {
        console.log(err);
    }
    res.status(201).json({user});
}

export const login= async (req, res, next)=>
{
    const {email, password} = req.body;
    let existuser;
    try
    {
        existuser = await User.findOne({email});
    }
    catch(err)
    {
        console.log(err);
    }
    
    if(!existuser)
    {
        return res.status(400).json({message: "Invalid credentials"});
    }
    const ispassword= bcrypt.compare(password, existuser.password);
    if(!ispassword)
    {
        return res.status(400).json({message: "Invalid credentials"});
    }
    return res.status(200). json({message:"Login Successfully", user:existuser});
}