const knex = require('../knex.config');

const getData = async() => {
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

    return {users,fields}
}


module.exports = {
    getData
}