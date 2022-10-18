const Koa = require('koa');
const app = new Koa();
const KoaRouter = require('koa-router');
const orm = require('../models')
const cors = require('@koa/cors')
const router = new KoaRouter();

router.get("bosses", "/boss", async (ctx) => {
    ctx.body = { data: 'Hola' }
    return ctx.body
});

app.use(cors({ origin: '*' }))
app.context.orm = orm;

app.getMaxListeners()
app.use(router.routes())
app.listen(3000, function(){
    console.log('Server running on https://localhost:3000')
 });