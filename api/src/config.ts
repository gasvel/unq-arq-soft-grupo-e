import dotenv from 'dotenv'
dotenv.config()

export default{
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/arq-meli',
    PORT: process.env.PORT || '3000'
}