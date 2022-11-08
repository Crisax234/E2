const Router = require('koa-router');

const router = new Router();

router.get('managers.show', '/', async (ctx) => {
  try {
    const managers = await ctx.orm.Manager.findALL();
    ctx.body = managers;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

module.exports = router;