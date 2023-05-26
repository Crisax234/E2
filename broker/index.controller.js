const axios = require('axios')
const SERVER_URL = process.env.SERVER_URL;

const createEvent = async (params) => {
    try {
        const myObj = JSON.parse(params);
        const name = myObj["name"];
        const date = myObj["date"];
        const price = myObj["price"];
        const quantity = myObj["quantity"];
        const location = myObj["location"];
        const latitude = myObj["latitude"];
        const longitude = myObj["longitude"];
        const event_id = myObj["event_id"];
        //const data = [name, date, price, quantity, location, latitude, longitude, event_id];
        // create a post with axios to create a ticket
        const response = await axios.post('http://api:4000/tickets', {
            name: name,
            date: date,
            price: price,
            quantity: quantity,
            location: location,
            latitude: latitude,
            longitude: longitude,
            event_id: event_id
        });
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
};

const validateRequest = async (params) => {
    try {
        const myObj = JSON.parse(params);
        const request_id = myObj["request_id"];
        const valid = myObj["valid"];
        //const data = [request_id, group_id, event_id, deposit_token, quantity, seller];
        // create a post with axios to create a ticket
        const response = await axios.post('http://localhost:4000/tickets/validation', {
            
            request_id: request_id,
            valid: true
            
        });
        return response.data;

    } catch (error) {
        console.log(error);
    }
};


module.exports = { 
    createEvent,
    validateRequest
}