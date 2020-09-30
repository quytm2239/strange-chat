var common_room = 69;
var items = [
    ["Iron Man", "/images/avatar/iron_man.webp"],
    ["Caption America", "/images/avatar/caption_america.webp"],
    ["Black Widow", "/images/avatar/black_widow.webp"],
    ["Hulk", "/images/avatar/hulk.webp"],
    ["Hawkeye", "/images/avatar/hawkeye.webp"],
    ["Vision", "/images/avatar/vision.webp"],
    ["Thor", "/images/avatar/thor.webp"],
    ["Loki", "/images/avatar/loki.webp"],
    ["Scarlet Witch", "/images/avatar/scarlet_witch.webp"],
    ["Quick Silver", "/images/avatar/quick_silver.webp"],
    ["Dr Strange", "/images/avatar/dr_strange.webp"],
    ["Thanos", "/images/avatar/thanos.webp"],
    ["Black Panther", "/images/avatar/black_panther.webp"]
 ]

module.exports = function(io) {
    console.log('->*<3- [SOCKETCHAT is LOADED] ->*<3-');
    io.on('connection', function (socket) {
        console.log(socket.id + ' connected');

        var addedUser = false;
        var suffix = '' + (Math.floor(Math.random() * 1000) + 1000);
        var item = items[Math.floor(Math.random() * items.length)];

        socket.username = item[0] + '@' + suffix;
        socket.room = common_room;
        socket.avatar = item[1];
        socket.join(common_room);

        var room = io.sockets.adapter.rooms[common_room];

        var jsonData = {
            room : common_room,
            username : socket.username,
            avatar: socket.avatar,
            total_online : room.length
        };

        socket.emit('your_info', jsonData);

        io.sockets["in"](socket.room).emit('join_chat', jsonData);

        // socket.on('join_chat', function (data) {
        //     if (addedUser) return;
        //     console.log(data);
        //     socket.username = data.username;
        //     socket.room = common_room;
        //     socket.join(common_room);
        //
        //     var room = io.sockets.adapter.rooms[common_room];
        //
        //     var jsonData = {
        //         room : common_room,
        //         username : data.username,
        //         total_online : room.length
        //     };
        //
        //     io.sockets["in"](socket.room).emit('join_chat', jsonData);
        // });

        // when the client emits 'new message', this listens and executes
        socket.on('new_message', function (data) {
            console.log(data);
            var mSecondsTime = new Date().getTime();

            var jsonData = {
              username : socket.username,
              avatar: socket.avatar,
              message: data,
              time: mSecondsTime
            };

            io.sockets["in"](socket.room).emit('new_message', jsonData);
        });

        // socket.on('load_history', function (data){
        //     var beginIndex = data.begin_index;
        //
        //     getChatHistory(socket.room, beginIndex, false, function(result){
        //         socket.emit('load_history', {
        //             history: result
        //         });
        //     });
        // });
        //https://www.ibm.com/developerworks/library/wa-bluemix-html5chat/

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', function () {
        // io.sockets["in"](socket.room).emit('typing',{
        //     username: socket.username
        // });

            socket.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop_typing', function () {
        // io.sockets["in"](socket.room).emit('stop_typing',{
        //     username: socket.username
        // });

            socket.emit('stop_typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            io.sockets["in"](socket.room).emit('user_left',{
                username: socket.username
            });
            console.log(socket.username + ' has left room: ' + socket.room);
        });
    });
};
