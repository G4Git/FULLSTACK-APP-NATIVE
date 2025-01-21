const { hashpassword } = require("../helper/hashpass")
const userModel = require("../models/userSchema")
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

module.exports={RegisterController}