const express = require('express')
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');

var app = express()

app.set('port', (process.env.PORT || 9095));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    let callback=request.query.callback
    response.send( "<html>" +
        " <form action='/' method='post'>\n" +
        "  <label for='username'>Username:</label><br>\n" +
        "  <input type='text' id='username' name='username' ><br>" +
        "  <input type='submit' value='Submit'>\n" +
        "</form> \n" +
        "<p/>" +
        "</html>")
});


app.post('/', function(request, response) {
    let name = request.body.username;
    let jsonObject={username: name}

    
    var token = jwt.sign(jsonObject, 'secret-string');
    response.status(200).send( token )
});



function hostname_and_port(request) {
    return (request.hostname || request.ip).replace("::ffff:","") + ":" + (app.get('port'));
}


app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});


