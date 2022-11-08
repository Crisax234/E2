const Router = require('koa-router');

const router = new Router();

//Solo se muestran las simulaciones que pertenecen al usuario
//Esto muestra todas las simulaciones
router.get('simulaciones.show', '/', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const tecnicid = session.tecnicid;
    const managerid = session.managerid;
    const mecanicid = session.userid;
    // si es mecanico solo se muestran las simulaciones que le pertenecen
    if (mecanicid){
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
    }else if(tecnicid){
      const simulacion = await ctx.orm.Simulacion.findAll({
        include: [
            { model: ctx.orm.Mecanic },
            { model: ctx.orm.Car },
          ],
        });
        ctx.body = simulacion;
    }else if(managerid){
      const simulacion = await ctx.orm.Simulacion.findAll({
        include: [
            { model: ctx.orm.Mecanic },
            { model: ctx.orm.Car },
          ],
        });
        ctx.body = simulacion;
    }else{
      ctx.throw("No eres mecanico", 404);
    }
    
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});
//Solo se muestran las simulaciones que pertenecen al usuario
router.get('simulaciones.show', '/all', async (ctx) => {
  try {
    const simulacion = await ctx.orm.Simulacion.findAll({
    include: [
          { model: ctx.orm.Solicitud },
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
//para mostrar una simulacion en especifico
router.get('simulaciones.show', '/showone/:id_simulacion', async (ctx) => {
  try {
      const simulacion = await ctx.orm.Simulacion.findByPk(ctx.params.id_simulacion);
      ctx.body = simulacion;
  } catch (error) {
      console.log(error);
      ctx.throw(404);
  }
});

//solo los mecanicos crean las simulaciones
router.post('simulaciones.create', '/', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const mecanicid = session.userid;
    if (mecanicid){
      //buscamos el auto, para poner los valores de fabrica
      const id_car = ctx.request.body.id_car;
      const car = await ctx.orm.Car.findByPk(id_car);
      const hp_car = car.hp;
      const torque_car = car.torque;
      const simulacion = await ctx.orm.Simulacion.create({
          id_mecanico: mecanicid,
          id_car: ctx.request.body.id_car,
          id_solicitud: ctx.request.body.id_solicitud,
          hp: hp_car,
          torque: torque_car,
          costo: 0,
          estado: false,
          });
      ctx.throw(simulacion.dataValues, 201);
        }else{
          ctx.throw("No eres mecanico", 404);
        }
  } catch (error) {
    ctx.throw(error);
  }
});
module.exports = router;
