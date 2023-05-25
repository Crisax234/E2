const mqtt = require('mqtt');
const { createEvent, validateRequest } = require('./index.controller');
const { v4: uuidv4 } = require('uuid');
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: 'grupo6',
  username: 'students',
  password: 'iic2173-2023-1-students',
};
/***
 * Browser
 * Using MQTT over WebSocket with ws and wss protocols
 * EMQX's ws connection default port is 8083, wss is 8084
 * Note that you need to add a path after the connection address, such as /mqtt
 */
const url = 'mqtt://passline.iic2173.net:9000';
/***
 * Node.js
 * Using MQTT over TCP with mqtt and mqtts protocols
 * EMQX's mqtt connection default port is 1883, mqtts is 8883
 */
// const url = 'mqtt://broker.emqx.io:1883'

// Create an MQTT client instance



const client = mqtt.connect(url, options);

client.on('connect', function () {
  console.log('Connected');
  // Subscribe to a topic
  client.subscribe('events/chile', function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Subscribed to events/chile');
    }
  });

  client.subscribe('events/validation', function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Subscribed to events/validation');
    }
  });
  
// Receive messages
  client.on('message', function (topic, message) {
    if (topic === 'events/chile') {
      console.log('Message received from', topic, ':', message.toString());
        // message is Buffer
        console.log(message.toString());
        createEvent(message.toString());
        // client.end();
      

      //const { quantity, event_id } = event;
      
      //client.publish('events/request', JSON.stringify(newMessage), function (err) {
        //if (err) {
          //console.log(err);
        //} else {
          //console.log('Message published to events/request:', newMessage);
        //}
      //});
      //createEvent(message.toString());
    }

    if (topic === 'events/validation') {
      console.log('Message received from', topic, ':', message.toString());

      const response = JSON.parse(message);
      const { request_id, group_id, valid } = response;
      console.log(`Received validation response for request ${request_id}, 
      group ${group_id}: 
      ${valid ? 'valid' : 'invalid'}`);
      // Handle the validation response in your code
      if (group_id === '6' && valid) {
        validateRequest(request_id);

      } else {
        console.log('Request invalid');
      }
    }
  });
});
// export client






