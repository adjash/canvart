const io = require("socket.io")();
const socketapi = {
    io: io
};


/*
    io - everyone
    server - people connected to same instance
    broadcast everyone except sender
*/
io.on("connection", function(socket) {
    console.log(socket.id)

    //emit data to frontend
    socket.emit("hello", "world");


    //get lines from frontend
    socket.on("sendLinesToServer", (lines) => {
        //console.log(lines);
        io.emit("getLinesFromServer", lines);
    });


    socket.on("userMessage", (message) => {
        console.log(message)
        io.emit("receiveUserMessage", message);
    });


    socket.on("clearFrame", (e) => {
        io.emit("serverCanvasClear", "");
    })

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
});

// end of socket.io logic

module.exports = socketapi;