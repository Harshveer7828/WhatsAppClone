const io = require("socket.io")();
const socketapi = {
    io: io
};

// require mongoose model
const userModel = require('./routes/users.js');
const messageModel = require('./routes/message.js');
const message = require("./routes/message.js");


// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "A user connected" );

    // assign a socket id to the user who is logged in the web app 

    socket.on('join-server', async username => {
        await userModel.findOneAndUpdate({username}, {socketId : socket.id})
    })

    // sending and reciving messages privately.

    socket.on('send-private-message',async messageObject =>{
        //create a new message in the message model
        await messageModel.create({
            sender : messageObject.sender,
            reciever : messageObject.reciever,
            message  : messageObject.message,
            
        })

        // push message to the reciever also
        const reciever = await userModel.findOne({
            username : messageObject.reciever 
        })

        socket.to(reciever.socketId).emit('recieving-private-message',messageObject);

    })


});
// end of socket.io logic

module.exports = socketapi;