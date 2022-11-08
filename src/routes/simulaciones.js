const Router = require('koa-router');

const router = new Router();

//Solo se muestran las simulaciones que pertenecen al usuario
router.get('simulaciones.show', '/', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const mecanicid = session.userid;
    const simulacion = await ctx.orm.Simulacion.findAll({
    where: {
        id_mecanico: mecanicid
        },
    include: [
        { model: ctx.orm.Mecanic },
        { model: ctx.orm.Car },
      ],
    });
    ctx.body = simulacion;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

router.post('simulaciones.create', '/', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const mecanicid = session.userid;
    
    const simulacion = await ctx.orm.Simulacion.create({
        id_mecanico: mecanicid,
        id_car: ctx.request.body.id_car,
        id_solicitud: ctx.request.body.id_solicitud,
        hp: ctx.request.body.hp,
        torque: ctx.request.body.torque,
        costo: ctx.request.body.costo,
        estado: ctx.request.body.estado,
        });
    ctx.throw(simulacion.dataValues, 201);
  } catch (error) {
    ctx.throw(error);
  }
});
module.exports = router;
