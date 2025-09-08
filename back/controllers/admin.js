const adminModel = require('../models/admin')

const getOnboarding = async(req,res) => {
    try {
        const fields = await adminModel.getOnboarding()
        return res.status(200).json({fields})
    } catch (error) {
        res.status(500).json({ error: 'An error has occured',error_message:error.message });
    }
}


//save onboarding 
const saveOnboarding = async (req,res) => {
    const {fields} = req.body
    try {
        await adminModel.updateOnboardingEntries(fields)
        return res.status(200).send(true)
    } catch (error) {
        res.status(500).json({ error: 'An error has occured',error_message:error.message });
    }
}

module.exports = {
    getOnboarding,
    saveOnboarding,

}