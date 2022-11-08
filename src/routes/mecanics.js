const Router = require('koa-router');

const router = new Router();

router.get('mecanics.show', '/', async (ctx) => {
  try {
    const mecanics = await ctx.orm.Mecanic.findALL(
      {
        include: [
          { model: ctx.orm.Play },
          { mode: ctx.orm.Simulacion },
        ],
      },
    );
    ctx.body = mecanics;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

module.exports = router;
