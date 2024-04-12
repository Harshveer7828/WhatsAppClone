const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
    sender : String,
    reciever : String,
    message :String,
    time:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('message',messageSchema)