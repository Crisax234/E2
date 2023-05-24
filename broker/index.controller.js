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
        const response = await axios.post('http://localhost:4000/tickets/', {
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

module.exports = { 
    createEvent
}