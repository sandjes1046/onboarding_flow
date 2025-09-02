const knex = require('../knex.config');

//function fetches onboarding fields
const getOnboarding = async(req,res) => {
    try {
        const onboarding = await knex('onboarding')

        let fields = {}

        //put the array into a key,value pair
        for(const field of onboarding)
        {
            fields[field.type] = field

            delete fields[field.type].type
        }

        return res.status(200).json({fields})
    } catch (error) {
        res.status(500).json({ error: 'An error has occured',error_message:error.message });
    }
}

//function to update each onboarding field entry
//updates only the step of each entry
const updateOnboardingEntries = async(fields) => {
    try {
        
    
        const stepBindings = []

        let stepCase = 'CASE type'

        Object.keys(fields).forEach((key) => {
            const {step} = fields[key]

            stepCase += 'WHEN ? THEN ?'
            stepBindings.push(key,step) 
        })

        await knex('onboarding').update({step: knex.raw(stepCase, stepBindings)})
        .whereIn('type', Object.keys(fields).map((key) => key))

        return true
    } catch (error) {
        console.log('An error has occured: ',error.message)
    }
}

//save onboarding 
const saveOnboarding = async (req,res) => {
    const {fields} = req.body
    try {
        await updateOnboardingEntries()
        return res.status(200).send(true)
    } catch (error) {
        res.status(500).json({ error: 'An error has occured',error_message:error.message });
    }
}

module.exports = {
    getOnboarding,
    saveOnboarding,

}