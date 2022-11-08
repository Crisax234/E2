const Router = require('koa-router');


const router = new Router();

router.delete('simulacions.delete', '/delete/:id_simulacion', async (ctx) => {
    try {
        // Buscamos ctx.params.id_Match
        var found = false
        console.log(ctx.state.tokendata.simulacions);

        ctx.state.tokendata.simulacions.forEach(simulacion => {
            if (simulacion.id == ctx.params.id_simulacion) {
                found = true;
            };
        });

        if (found) {
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