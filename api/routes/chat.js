const mongoose = require("mongoose");
const url = "mongodb+srv://admin:admin@cluster0-u7zcd.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	console.log('connected', err);
});

var Message = mongoose.model('Message',{ name : String, message : String});
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/messages', (req, res) => {
		Message.find({},(err, messages)=> {
			res.send(messages);
		});
	});


app.post('/messages', (req, res) => {
		var message = new Message(req.body);
		message.save((err) =>{
			if(err)
			sendStatus(500);
			res.sendStatus(200);
		});
	});