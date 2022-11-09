const Router = require('koa-router');

const router = new Router();


router.post('pieza_simulacions.create', '/', async (ctx) => {
    try {
      const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
      const mecanicid = session.userid;
      const tecnic = session.tecnicid;
      const manager = session.managerid;
      if (mecanicid || tecnic || manager) {
        //buscamos el auto, para poner los valores de fabrica
        if (ctx.request.body.tipo === "Performance"){
            const pieza_simulaciones = await ctx.orm.Pieza_simulacion.findAll({
                where: {
                    id_performance: ctx.request.body.id_pieza,
                    id_simulacion: ctx.request.body.id_simulacion,
                    },
                });
            console.log(pieza_simulaciones);

            if (pieza_simulaciones.length >= 1){
                ctx.throw("Esta simulacion ya tiene esta pieza", 404);
            }else{
                const pieza_actual = await ctx.orm.Performance.findByPk(ctx.request.body.id_pieza);
                categoria_actual = pieza_actual.categoria;
                const categoria_match = await ctx.orm.Pieza_simulacion.findAll({
                    where: {
                        categoria: categoria_actual,
                        id_simulacion: ctx.request.body.id_simulacion,
                        },
                    });
                
                if (categoria_match.length >= 1){
                    ctx.throw("Esta simulacion ya tiene una pieza de esta categoria", 404);
                }else{
                    const simulacion_actual_modificar = await ctx.orm.Simulacion.findByPk(ctx.request.body.id_simulacion, {
                        include: [
                            { model: ctx.orm.Mecanic, required: false },
                            { model: ctx.orm.Car, required: false },
                            { model: ctx.orm.Solicitud, required: false },
                            { model: ctx.orm.Pieza_simulacion, required: false },
                        ],
                      });
                    const pieza_simulacion_created = await ctx.orm.Pieza_simulacion.create({
                        id_simulacion: ctx.request.body.id_simulacion,
                        id_performance: ctx.request.body.id_pieza,
                        categoria: categoria_actual,
                        });
                    const hp = pieza_actual.hp;
                    const torque = pieza_actual.torque;
                    const precio = pieza_actual.precio;
                    simulacion_actual_modificar.hp = simulacion_actual_modificar.hp + hp;
                    simulacion_actual_modificar.torque = simulacion_actual_modificar.torque + torque;
                    simulacion_actual_modificar.costo = simulacion_actual_modificar.costo + precio;
                    simulacion_actual_modificar.save();
                    
                    
                    ctx.throw(pieza_simulacion_created.dataValues, 201);
                }
            }
        }else if(ctx.request.body.tipo === "Look"){
            const pieza_actual = await ctx.orm.Look.findByPk(ctx.request.body.id_pieza);
                categoria_actual = pieza_actual.categoria;
                const categoria_match = await ctx.orm.Pieza_simulacion.findAll({
                    where: {
                        categoria: categoria_actual,
                        id_simulacion: ctx.request.body.id_simulacion,
                        },
                    });
                
                if (categoria_match){
                    ctx.throw("Esta simulacion ya tiene una pieza de esta categoria", 404);
                }else{
                    const simulacion_actual_modificar = await ctx.orm.Simulacion.findByPk(ctx.request.body.id_simulacion, {
                        include: [
                            { model: ctx.orm.Mecanic, required: false },
                            { model: ctx.orm.Car, required: false },
                            { model: ctx.orm.Solicitud, required: false },
                            { model: ctx.orm.Pieza_simulacion, required: false },
                        ],
                      });
                    const pieza_simulacion_created = await ctx.orm.Pieza_simulacion.create({
                        id_simulacion: ctx.request.body.id_simulacion,
                        id_looks: ctx.request.body.id_pieza,
                        });
                    const precio = pieza_actual.precio;
                    simulacion_actual_modificar.costo = simulacion_actual_modificar.costo + precio;
                    simulacion_actual_modificar.save();
                    
                    
                    ctx.throw(pieza_simulacion_created.dataValues, 201);
                }
        }else {
            ctx.throw("no se selecciona el tipo de pieza",404);
        }
    }else{
        ctx.throw("No eres ni mecanico ni tecnico, no puedes agregar piezas a la simulacion", 404);
    }
    } catch (error) {
      ctx.throw(error);
    }
  });

  router.get('pieza_simulacions.show', '/all', async (ctx) => {
    try {
      const pieza_simulacion = await ctx.orm.Pieza_simulacion.findAll({
      include: [
            { model: ctx.orm.Simulacion },
            { model: ctx.orm.Performance },
            { model: ctx.orm.Look },
          ],
        });
        ctx.body = pieza_simulacion;
      
    } catch (error) {
      console.log(error);
      ctx.throw(404);
    }
  });
  module.exports = router;