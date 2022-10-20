const Koa = require('koa');
const app = new Koa();
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const orm = require('../models')
const cors = require('@koa/cors')
const router = new KoaRouter();


router.post('boss.create', '/boss', async (ctx) => {
    try {

        const boss = await ctx.orm.Boss.create({
        name: ctx.request.body.name,
        password: ctx.request.body.password,
        email: ctx.request.body.email
        });
        ctx.status = 201;
    } catch (error) {
      ctx.throw(error);
    }
  })


router.get("boss.show", "/boss", async (ctx) => {
    try {
        const bosses = await ctx.orm.Boss.findAll();
        ctx.body = bosses;
      } catch (error) {
        console.log(error);
        ctx.throw(404);
      }
});
router.post('form.create', '/form', async (ctx) => {
    try {

        const form = await ctx.orm.Form.create({
        nombre: ctx.request.body.nombre,
        presupuesto: ctx.request.body.presupuesto,
        descripcion: ctx.request.body.descripcion,
        estado: ctx.request.body.estado
        });
        ctx.status = 201;
    } catch (error) {
      ctx.throw(error);
    }
  })


router.get("form.show", "/form", async (ctx) => {
    try {
        const forms = await ctx.orm.Form.findAll();
        ctx.body = forms;
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
app.listen(3000, function(){
    console.log('Server running on https://localhost:3000')
 });