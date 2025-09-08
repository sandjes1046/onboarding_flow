const userModel = require('../models/user')

//check if user exists if they do direct to where they left off 
const getUser = async(req, res) => {
   
    try { 
        
        const {email,password} = req.query

        const data = await userModel.getUser({email,password})
        return res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ error: 'An error has occured', error_message:error.message });
    }

}

//get user informaion for current step, and get onboarding fields for the step
const getStep = async(req,res) => {
    try {
        const {email,step} = req.query

        const data = await userModel.getStep({email,step})
        return res.status(200).json({answers:data.user_data,fields:data.fields})

    } catch (error) {
        console.log(error)
       res.status(500).json({ error: 'An error has occured',error_message:error.message });
    }
}

//save user data for current step
const saveStep = async(req,res) =>{
    try {
        const {email,step,answers,complete=false} = req.body

        await userModel.saveStep( {email,step,answers,complete})
        return res.status(200).send(true)
    } catch (error) {
        res.status(500).json({ error: 'An error has occured',error_message:error.message });
    }
}



module.exports = {
    getUser,
    getStep,
    saveStep,

}