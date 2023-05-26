const Router = require('koa-router');
const { v4: uuidv4 } = require('uuid');
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
        ctx.status = 201;
        ctx.body = {message: "Ticket saved"};
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});



router.post('tickets.buy','/buy', async (ctx) => {
  try {
    const quantity = ctx.request.body.quantity;
    if (quantity > 0){ 

      //LLamar api de pagos y obtener deposit token

    const newMessage = {
      request_id: uuidv4(),
      group_id: '6',
      event_id: ctx.request.body.event_id,
      deposit_token: '',
      quantity: quantity,
      seller: 0,
    };
    const client = mqtt.connect(url, options);
    client.on('connect', function () {
      console.log('Connected');
      client.publish('events/request', JSON.stringify(newMessage), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Message published to events/request:', newMessage);
        }
      });
    client.end();
    });

    const request = await ctx.orm.Request.create({
      event_id: ctx.request.body.event_id,
      request_id: newMessage.request_id,
      valid: false,
      quantity: 1,
    });
    ctx.status = 201;
    ctx.body = {message: "Request created"};

} else {
  ctx.status = 201;
  ctx.body = {message: "No tickets available"};
}
} catch (error) {
  console.log(error);
  ctx.throw(404);
}
});


router.post('tickets.validation','/validation', async (ctx) => {
  try {
    const request_idd = ctx.request.body.request_id;
    const valid = ctx.request.body.valid;
    if (valid){
      const request = await ctx.orm.Request.findOne({where:{request_id: request_idd}});
      const up = await ctx.orm.Request.update({valid: true}, {where:{request_id: request_idd}});
      
      const ticket = await ctx.orm.Ticket.findOne({where:{event_id: request.event_id}});
      
      const upp = await ctx.orm.Ticket.update({quantity: ticket.quantity - 1}, {where:{event_id: request.event_id}});
      
      console.log(ticket.quantity);
      ctx.status = 201;
      ctx.body = {message: "Ticket comprado, se desconto la cantidad"};
      
    }
    else{
      ctx.status = 201;
      
      ctx.body = {message: "Transaccion no aceptada"};
    }
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

router.get('tickets_requests.show', '/requests', async (ctx) => {
  try {
    const showrequest = await ctx.orm.Request.findAll();
    ctx.status = 201;
    ctx.body = showrequest

  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});


module.exports = router;