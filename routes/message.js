const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    message :String,
    time:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('message',messageSchema)