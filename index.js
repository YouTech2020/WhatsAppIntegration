var express = require('express');
var bodyParser = require('body-parser');
var cfenv = require('cfenv');
appEnv = cfenv.getAppEnv();


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


var port = appEnv.isLocal ? 3000 : appEnv.port;

var mobiles = [{ "model": "iphone11", "cost": 60000 }, { "model": "iphone10", "cost": 50000 }, { "model": "realmex2", "cost": 15000 }];

app.get('/', function (req, res) {



    res.json(mobiles);


});

app.post('/twilio',function (req, res) {

    //console.log("data received");

    console.log("data from whatsapp " + JSON.stringify(req.body));
  
    var model = req.body.Body;
    const accountSid =' your twilio account sid';
    const authToken = 'your twilio account oauth token';
    const client = require('twilio')(accountSid, authToken);
   
    var mobileObj =  mobiles.filter(obj => obj.model === model);   
   
    

    client.messages
        .create({
            from: 'whatsapp:from whatsapp number',
            body: model + " model  cost is "+ mobileObj[0].cost,
            to: 'whatsapp:to address'
        })
        .then(message => console.log(message.sid));

});

app.listen(port, function () {

    console.log("this is applicatio running on port " + port);
});