const Router = require('koa-router');

const router = new Router();

router.get('tecnics.show', '/', async (ctx) => {
  try {
    const tecnics = await ctx.orm.Tecnic.findALL();
    ctx.body = tecnics;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

module.exports = router;