const Router = require('koa-router');


const router = new Router();

// Solo manager puede eliminar una simulacion (admin)

router.delete('simulacions.delete', '/delete/:id_simulacion', async (ctx) => {
    try {
        console.log(ctx.state.tokendata.simulacions);

        if (ctx.state.tokendata.type === 'Manager') {
            const response = await ctx.orm.Simulacion.destroy({
                where: { id: `${ctx.params.id_simulacion}` }
            })
            ctx.response.status = 202;
        } else {
            ctx.throw('No tienes permiso para eliminar esta simulacion', 401);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(404);
    }
});
module.exports = router;