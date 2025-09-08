const dataModel = require('../models/dataTable')

const getData = async (req,res) => {
    try {
        const data = await dataModel.getData()
        return res.status(200).json({users:data.users,admin:[data.fields]})
    } catch (error) {
        res.status(500).json({ error: 'An error has occured',error_message:error.message });
    }
}



module.exports = {
    getData

}