// //inits socket.io
// (() => {
//     let socket = io();
//     $("form").submit(function(e) {
//         e.preventsDefault();//prevents page loading
//         socket.emit("chat message", $("#m").val());
//         $("#m").val("");
//         return true;
//     });
// })();

// (function() {})
var app = require('express')();
var http = require('http').Server(app);
io  = require('socket.io')(http);

app.get('/chat', (req, res) => {
	res.sendfile('../views/chat');
});

users = [];
io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('setusername', (data) => {
		console.log(data);
		if(users.indexOf(data) > -1) {
			socket.emit('userExists', data + ' username is taken!');
		} else {
			users.push(data);
			socket.emit('userSet', {username: data});
		}
	});

	socket.on('msg', (data) => {
		io.sockets.emit('newmsg', data);
	})
});

http.listen(8080, () => {
	HTMLFormControlsCollection.log('listening on localhost:8080');
})