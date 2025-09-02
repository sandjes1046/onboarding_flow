const knex = require('../knex.config');

const getData = async (req,res) => {
    try {
        //get tables for data able in fron end 
        const users = await knex('users')
        const onboarding = await knex('onboarding')

         let fields = {}

        //put the array into a key,value pair
        for(const field of onboarding)
        {
            fields[field.type] = field

            delete fields[field.type].type
        }

        return res.status(200).json({users,admin:[fields]})
    } catch (error) {
        res.status(500).json({ error: 'An error has occured',error_message:error.message });
    }
}



module.exports = {
    getData

}