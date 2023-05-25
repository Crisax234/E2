const Router = require('koa-router');
const router = new Router();
const { v4: uuidv4 } = require('uuid');

router.post('requests.create','/create', async (ctx) => {
  try {
    const quantity = ctx.request.body.quantity;
    if (quantity > 0){ 
    const newMessage = {
      request_id: uuidv4(),
      group_id: '6',
      event_id: ctx.request.body.event_id,
      deposit_token: '',
      quantity: quantity,
      seller: 0,
    };
    client.publish('events/request', JSON.stringify(newMessage), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Message published to events/request:', newMessage);
      }
    });
    const request = await ctx.orm.Request.create({
      event_id: ctx.request.body.event_id,
      request_id: newMessage.request_id,
      valid: false,
    });
    

} else {
  ctx.status = 201;
  ctx.body = {message: "No tickets available"};
}
} catch (error) {
  console.log(error);
  ctx.throw(404);
}
});


router.get('requests.show', '/', async (ctx) => {
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