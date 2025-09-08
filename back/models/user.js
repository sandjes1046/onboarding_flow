const knex = require('../knex.config');

const getUser = async({email,password}) => {

    const user = await knex('users').where({email}).first();

    if(user)
    {
        return {email:user.email,password:user.password,complete:user.complete,step:user.step}
    }
    else
    {
        const new_user = await knex('users').insert({email,password}).returning(['complete','step'])

        return {step:new_user[0].step,complete:new_user[0].complete}
    }
}

const getStep = async({email,step}) => {
    try {
        const user = await knex('users').where({email}).first();

        const onboarding = await knex('onboarding').where({step})

        if(onboarding)
        {
            let fields = {}
            let user_data = {}

            //put the array into a key,value pair
            for(const field of onboarding)
            {
                const key = field.type
                fields[key] = field

                delete fields[key].type

                //assign relevan user data for onboarding step
                if(key == 'address')
                {
                        user_data.street = user.street
                        user_data.city = user.city
                        user_data.state = user.state
                        user_data.zip = user.zip
                }
                else
                {
                    user_data[key] = user[key]
                }
            }

            return {user_data,fields}

        }
        else
        {
            console.log('Missing data')
            throw new Error("Missing data"); 
        }
    } catch (error) {
        console.log( 'An error has occured',error.message )

    }
}

const saveStep = async({email,step,answers,complete}) => {
    delete answers.fields
    delete answers.status
    delete answers.answers
    answers.step = parseInt(step)
    await knex('users').update({complete,step:parseInt(step),...answers}).where({email})
    return true
}

module.exports = {
    getUser,
    getStep,
    saveStep
}