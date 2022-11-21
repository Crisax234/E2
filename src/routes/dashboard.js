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
        const piezasPerformance = await ctx.orm.Performance.findAll();
        const cant_piezasPerformance = piezasPerformance.length;
        const piezasLook = await ctx.orm.Look.findAll();
        const cant_piezasLook = piezasLook.length;
        var categoriaIntercooler = 0;
        var categoriaTurbo = 0;
        var categoriaChargepipe = 0;
        var categoriaCapot = 0;
        var categoriaLlanta = 0;
        var categoriaNeumatico = 0;
        for (let step = 0; step < cant_piezasPerformance; step++) {
            if (piezasPerformance[step].categoria == "Intercooler") {
                categoriaIntercooler += 1;
            }else if(piezasPerformance[step].categoria == "ChargePipe"){
                categoriaChargepipe += 1;
            }else if(piezasPerformance[step].categoria == "Turbo"){
                categoriaTurbo += 1;
            }
        }     
        for (let step = 0; step < cant_piezasLook; step++) {
            if (piezasLook[step].categoria == "Capot") {
                categoriaCapot += 1;
            }else if(piezasLook[step].categoria == "Llanta"){
                categoriaLlanta += 1;
            }else if(piezasLook[step].categoria == "Neumatico"){
                categoriaNeumatico += 1;
            } 
        }

        ctx.body = [
            [{name : "cant_simulaciones", pv : cant_simulaciones},
            {name : "cant_solicitudes", pv : cant_solicitudes}],[

            {name : "costo_total_simulaciones", pv : costo_total_simulaciones},
            {name : "costo_total_solicitudes", pv: costo_total_solicitudes}],

            [{name : "categoriaIntercooler", pv : categoriaIntercooler},
            {name : "categoriaTurbo", pv : categoriaTurbo},
            {name : "categoriaChargepipe", pv : categoriaChargepipe}],
            
            [{name : "categoriaCapot", pv : categoriaCapot},
            {name : "categoriaLlanta", pv : categoriaLlanta},
            {name : "categoriaNeumatico", pv : categoriaNeumatico}]
        ];
    } catch (error) {
        console.log(error);
        ctx.throw(404);
    }
});
module.exports = router;