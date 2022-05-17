const mngr = require('./manager');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/', function(request, response){
	response.send('Hello!!');
});

app.post('/processAll', function(request, response) {
	mngr.Manager(request.body);
});

app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
