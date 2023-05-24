const Router = require('koa-router');
const router = new Router();
const mqtt = require('mqtt');
const url = 'mqtt://passline.iic2173.net:9000';
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: 'grupo6',
  username: 'students',
  password: 'iic2173-2023-1-students',
};
const client = mqtt.connect(url, options);

// post to create ticket
router.post('tickets.create', '/', async (ctx) => {
  try {
        
        const ticket = await ctx.orm.Ticket.create({
          name : ctx.request.body.name,
          date : ctx.request.body.date,
          price : ctx.request.body.price,
          quantity : ctx.request.body.quantity,
          location : ctx.request.body.location,
          latitude : ctx.request.body.latitude,
          longitude : ctx.request.body.longitude,
          event_id : ctx.request.body.event_id
        });
        console.log(ticket);
        ctx.status = 201;
        ctx.body = {message: "Ticket saved"};
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});



router.post('tickets.validate','/validate', async (ctx) => {
  try {
    const newMessage = {
      request_id: uuidv4(),
      group_id: '6',
      event_id: ctx.request.body.event_id,
      deposit_token: '',
      quantity: ctx.request.body.quantity ,
      seller: 0,
    };
    
    client.publish('events/request', JSON.stringify(newMessage), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Message published to events/request:', newMessage);
      }
    });
        
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

router.get('tickets.show', '/', async (ctx) => {
  try {
    const ticket = await ctx.orm.Ticket.findAll();
    console.log(ticket);
    console.log('bien')
    ctx.body = ticket;
    
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

// show 25 tickets limit





module.exports = router;