'use strict';
const express = require('express');
let http = require('http').Server(express);
let io = require('socket.io')(http);
var Kafka = require('no-kafka');


// Defining the PORT
const port = 3010;

// Initialize the app
const app = express();


// Mongodb Config



// Defining the Middlewares

// BodyParser Middleware

io.on('connection', (socket) => {
    console.log('USER CONNECTED');
 
    socket.on('disconnect', function(){
      console.log('USER DISCONNECTED');
    });
   
  });
app.listen(port, function(){
    console.log("Server running on localhost:" + port);
    var consumer = new Kafka.SimpleConsumer({
//connectionString: 'localhost:9092',
connectionString: 'kafka.treetronix.com:9095',
        clientId: 'no-kafka-client'
    });

    var dataHandler = function (messageSet, topic, partition) {
messageSet.forEach(function (m) {
console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
return io.emit('message', {y: m.message.value.toString('utf8')});
});
};
 
return consumer.init().then(function () {
// Subscribe partitons 0 and 1 in a topic:
//var v1= consumer.subscribe('testTopic', dataHandler);
var v1 = consumer.subscribe('AS.Treetronix.v1', dataHandler);
var arr=[];
arr.push([v1]);
console.log("val:"+arr);
return arr;

});


});

