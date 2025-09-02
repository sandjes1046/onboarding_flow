const knex = require('../knex.config');

//check if user exists if they do direct to where they left off 
const getUser = async(req, res) => {
    const {email,password} = req.query
    try {
        //normal verification would require both email and password to be correct but since 
        //this is just for registration purposes I will only check if the email exists

        const user = await knex('users').where({email}).first();

        if(user)
        {
            return res.status(200).json({email:user.email,password:user.password,complete:user.complete,step:user.step})
        }
        else
        {
            //insert new registering user
            const new_user = await knex('users').insert({email,password}).returning(['complete','step'])

            return res.status(200).json({step:new_user[0].step,complete:new_user[0].complete})
        }

    } catch (error) {
        res.status(500).json({ error: 'An error has occured', error_message:error.message });
    }

}

//get user informaion for current step, and get onboarding fields for the step
const getStep = async(req,res) => {
    const {email,step} = req.query
    try {
        const user = await knex('users').where({email}).first();

        //get onboarding entries
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

            return res.status(200).json({answers:user_data,fields})

        }
        else
        {
            console.log('Missing data')
            throw new Error("Missing data"); 
        }

    } catch (error) {
        console.log(error)
       res.status(500).json({ error: 'An error has occured',error_message:error.message });
    }
}

//save user data for current step
const saveStep = async(req,res) =>{
    const {email,step,answers,complete=false} = req.body
    try {
        await knex('users').update({complete,step,...answers}).where({email})
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