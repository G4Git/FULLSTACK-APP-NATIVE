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
            const user=await userModel({name,email,password}).save()
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