var http = require('http');

var fs = require('fs');



function handle_incoming_request (req, res) {

    console.log("INCOMING REQUEST: " + req.method + " " + req.url);

    load_sensor_data(function(err, readings){

    if (err) { 

       console.log("Couldn't read file");

    }

    console.log(readings);

    res.writeHead(200, { "Content-Type" : "application/json" });

             var array=readings.split(',');

res.write(JSON.stringify({temperature:array[0], humidity:array[1], windspeed:array[2], time:array[3],location:array[4]},null," "));
    res.end();

   });

}



function load_sensor_data(callback) {

   fs.readFile(

   "sensorlog.txt",'utf8',

   function (err, readings) {

   if (err) {

   callback(err);

return;



}

callback(null, readings);

}

);

}

var s = http.createServer(handle_incoming_request);


s.listen(8080);


