const Router = require('koa-router');

const router = new Router();
router.get('dashboard.show', '/', async (ctx) => {
    try {
        const simulaciones = await ctx.orm.Simulacion.findAll();
        const cant_simulaciones = simulaciones.length;
        var costo_total_simulaciones = 0;
        for (let step = 0; step < cant_simulaciones; step++) {
            costo_total_simulaciones += simulaciones[step].costo;
        }
        const solicitudes = await ctx.orm.Solicitud.findAll();
        const cant_solicitudes = solicitudes.length;
        var costo_total_solicitudes = 0;
        for (let step = 0; step < cant_solicitudes; step++) {
            costo_total_solicitudes += solicitudes[step].presupuesto;
        }
        ctx.body = [
            {cant_simulaciones: cant_simulaciones},
            {costo_total_simulaciones: costo_total_simulaciones},
            {cant_solicitudes: cant_solicitudes},
            {costo_total_solicitudes: costo_total_solicitudes}
        ];
    } catch (error) {
        console.log(error);
        ctx.throw(404);
    }
});
module.exports = router;