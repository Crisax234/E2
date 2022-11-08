const Router = require('koa-router');

const router = new Router();


router.get('solicitudes.show', '/all', async (ctx) => {
    try {
      const solicitud = await ctx.orm.Solicitud.findAll({
      include: [
            { model: ctx.orm.Manager },
            { model: ctx.orm.Car },
          ],
        });
        ctx.body = solicitud;
      
    } catch (error) {
      console.log(error);
      ctx.throw(404);
    }
});

router.post('solicitudes.create', '/', async (ctx) => {
    try {
      const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
      const managerid = session.managerid;
      if (managerid){
        //buscamos el auto, para poner los valores de fabrica
        const car = ctx.orm.Car.findByPk(ctx.request.body.id_car);
        const hp_car = car.hp;
        const torque_car = car.torque;
        const solicitud = await ctx.orm.Solicitud.create({
                id_manager: managerid,
                id_car: ctx.request.body.id_car,
                titulo: ctx.request.body.titulo,
                presupuesto: ctx.request.body.presupuesto,
                descripcion: ctx.request.body.descripcion,
                estado: false,
            });
        ctx.throw(solicitud.dataValues, 201);
        }else{
          ctx.throw("No eres manager", 404);
        }
    } catch (error) {
      ctx.throw(error);
    }
  });

module.exports = router;