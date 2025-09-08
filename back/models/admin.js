const knex = require('../knex.config');

const getOnboarding = async() => {
    const onboarding = await knex('onboarding')
    
    let fields = {}

    //put the array into a key,value pair
    for(const field of onboarding)
    {
        fields[field.type] = field

        delete fields[field.type].type
    }

    return fields
}

const updateOnboardingEntries = async(fields) => {
    try {
        
        const stepBindings = []

        let stepCase = 'CASE type '

        Object.keys(fields).forEach((key) => {
            const {step} = fields[key]

            stepCase += ' WHEN ? THEN ?::int '
            stepBindings.push(key,parseInt(step)) 
        })
        stepCase += ' END'

        await knex('onboarding').update({step: knex.raw(stepCase, stepBindings)})
        .whereIn('type', Object.keys(fields).map((key) => key))

        return true
    } catch (error) {
        console.log('An error has occured: ',error.message)
    }
}

module.exports = {
    getOnboarding,
    updateOnboardingEntries,
}