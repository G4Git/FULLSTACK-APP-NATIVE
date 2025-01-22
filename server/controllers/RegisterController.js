const { hashpassword, comparepassword } = require("../helper/hashpass")
const userModel = require("../models/userSchema")
const jwt = require('jsonwebtoken')

const RegisterController = async (req,res) => {
    try
    {
        let { name, email, password } = req.body
        // 
        if (!name || !email)
        {
            return res.status(400).send({
                sucess: false,
                message:"Name and Emial is Required"
            })
        }

        if (!password || password.length<6)
            {
                return res.status(400).send({
                    sucess: false,
                    message:"Password must be required more than 6"
                })
        }
        // Existing User
        const userExist = await userModel.findOne({ email: email })
        if (userExist)
        {
            return res.status(400).send({
                sucess: false,
                message:"User Already Exist"
            })
        }
        else
        {
            let hash= await hashpassword(password)
            const user=await userModel({name,email,password:hash}).save()
        }
       
        return res.send({
            sucess: true,
            message:"User Created Sucessfully"
        }) 


    }
    catch (err)
    {
        console.log(err)
        return res.status(400).send({
            sucess: false,
            message: "Error in Register API"
        })
    }
}
const LoginController = async (req, res) => {
    try
    {
        const { email, password } = req.body;
        if (!email || !password)
        {
           return  res.status(500).send({
                sucess: false,
                message:"Email and Password can't be empty"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user)
        {
            return res.status(500).send({
                sucess: false,
                message:"User not Found"
            })
        }
        
        //  match password;
        const match = await comparepassword(password,user.password)
        if (!match)
        {
            return res.status(500).send({
                sucess: false,
                message:"Password doesnt match"
            })
        }
        // Token

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn:'7d'
        })
        // undefined password
        user.password = undefined;
        res.status(200).send({
            sucess: true,
            message: "Sucessfully login",
            token,
            user
        })

    }
    catch (err)
    {
    
        console.log(err)
        return res.status(500).send({
            sucess: false,
            message:"Error in Login Controller"
        })
    }
}

module.exports={RegisterController,LoginController}