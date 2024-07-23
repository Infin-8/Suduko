const mongoose = require('mongoose')
require('dotenv').config();

const db = process.env.MONGO_URI

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`You're connected to DB - ${db} \n "There is no spoon"`))
    .catch((err) => console.log('confing error', err))