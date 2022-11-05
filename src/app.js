const Koa = require('koa');
const app = new Koa();
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const orm = require('../models')
const cors = require('@koa/cors')
const router = new KoaRouter();


router.post('user.create', '/user', async (ctx) => {
    try {

        const user = await ctx.orm.User.create({
        name: ctx.request.body.name,
        password: ctx.request.body.password,
        email: ctx.request.body.email,
        rol: ctx.request.body.rol
        });
        ctx.status = 201;
    } catch (error) {
      ctx.throw(error);
    }
  })


router.get("user.show", "/user", async (ctx) => {
    try {
        const users = await ctx.orm.User.findAll();
        ctx.body = users;
      } catch (error) {
        console.log(error);
        ctx.throw(404);
      }
});


router.post('solicitud.create', '/solicitud', async (ctx) => {
    try {

        const solicitud = await ctx.orm.Solicitud.create({
        titulo: ctx.request.body.titulo,
        presupuesto: ctx.request.body.presupuesto,
        chasis: ctx.request.body.chasis,
        descripcion: ctx.request.body.descripcion,
        estado: ctx.request.body.estado
        });
        ctx.status = 201;
    } catch (error) {
      ctx.throw(error);
    }
  })


router.get("solicitud.show", "/solicitud", async (ctx) => {
    try {
        const solicitudes = await ctx.orm.Solicitud.findAll();
        ctx.body = solicitudes;
      } catch (error) {
        console.log(error);
        ctx.throw(404);
      }
});

app.use(cors({ origin: '*' }))
app.context.orm = orm;
app.use(KoaBody());
app.getMaxListeners()
app.use(router.routes())
app.listen(4000, function(){
    console.log('Server running on https://localhost:4000')
 });