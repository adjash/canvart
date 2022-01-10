const io = require("socket.io")();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on("connection", function(socket) {
    console.log(socket.id)

    //emit data to frontend
    socket.emit("hello", "world");


    //get lines from frontend
    socket.on("sendLinesToServer", (lines) => {
        //console.log(lines);
        socket.broadcast.emit("getLinesFromServer", lines);
    });


    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
});

// end of socket.io logic

module.exports = socketapi;