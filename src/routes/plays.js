const Router = require('koa-router');

const router = new Router();

router.get('plays.show', '/', async (ctx) => {
  try {
    const play = await ctx.orm.Play.findAll({
      include: [
        { model: ctx.orm.Mecanic },
      ],
    });
    ctx.body = play;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

router.post('plays.create', '/', async (ctx) => {
  try {
    //if (match.current !== (ctx.request.body.player)) {
    //  ctx.throw('No es tu turno', 403);
    //}
    if (ctx.body.x !== ctx.body.y) {
      ctx.throw('son diferentes', 403);
    }

    const play = await ctx.orm.Play.create(ctx.request.body);
    ctx.throw(play.dataValues, 201);
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;
