import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js"

export async function signup(req,res) {
    try{
        const {email,password,username} = req.body

        if(!email || !password || !username){
            return res.status(400).json({success:false,message:"All fields are reuired!!!"})
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,})$/
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalid email address!!!"})
        }

        if(password.length < 6){
            return res.status(400).json({success:false,message:"Password must be at least 6"})
        }

        const existingUserByEmail = await User.findOne({ email: email });
        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"Email already exists!!!"})
        }

        const existingUserByUsername = await User.findOne({username:username})
        if(existingUserByUsername){
            return res.status(400).json({success:false,message:"Username already exists!!!"})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)


        const newUser = new User({
            email,
            password: hashedPassword,
            username,
        })

        
        generateTokenAndSetCookie(newUser._id, res)
        
        await newUser.save()
        
        res.status(201).json({success:true,message:"User created successfully!!!"})
        

    }catch(e){
        console.log("Error in SignUp controller:"+e.message)
        res.status(500).json({success:false,message:"Internal server error!!!"})


    }
}

export async function login(req,res) {
    try{
        const {email,password} = req.body
        const existingUserByEmail = await User.findOne({ email: email });
        if(!existingUserByEmail){   
            return res.status(400).json({success:false,message:"Email does not exist!!!"})
        }
        const isValidPassword = await bcryptjs.compare(password, existingUserByEmail.password)
        if(!isValidPassword){
            return res.status(400).json({success:false,message:"Invalid password!!!"})
        }
        generateTokenAndSetCookie(existingUserByEmail._id,res)

        res.status(200).json({success:true,message:"Login successful!!!"})
    }catch(e){
        console.log("Error in Login controller:"+e.message)
        res.status(500).json({success:false,message:"Internal server error!!!"})
    }


}

export async function logout(req,res) {
    
    try{
        res.clearCookie("jwt-blog")
        res.status(200).json({success:true,message:"Logged out successfully!!!"})
    }catch(e){
        console.log("Error in Logout controller:"+e.message)
        res.status(500).json({success:false,message:"Internal server error!!!"})
    }


}

export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}