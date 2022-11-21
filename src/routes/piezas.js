const Router = require('koa-router');

const router = new Router();
router.get('piezas.show', '/performance', async (ctx) => {
    try {
        const piezas = await ctx.orm.Performance.findAll();
        ctx.body = piezas;
    } catch (error) {
        console.log(error);
        ctx.throw(404);
    }
});
router.get('piezas.show', '/look', async (ctx) => {
    try {
        const piezas = await ctx.orm.Look.findAll();
        ctx.body = piezas;
    } catch (error) {
        console.log(error);
        ctx.throw(404);
    }
});
module.exports = router;

