import mongoose from 'mongoose'
import config from './config'

(async () => {
    try{
        const db = await mongoose.connect('mongodb://'+ config.MONGO_HOST + '/' + config.MONGO_DB)
        console.log('db conectada ', db.connection.name)   
    }catch(error){
        console.error(error)
    }
})()