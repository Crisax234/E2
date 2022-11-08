const Router = require('koa-router');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const manager = require('../../models/manager');

const router = new Router();

router.post("/login", async (ctx) => {
    try {
        const mecanic = await ctx.orm.Mecanic.findOne({
            where: { email: ctx.request.body.email },
            include: [
                { model: ctx.orm.Simulacion, attributes: ['id'] }
            ]
        });
        const tecnic = await ctx.orm.Tecnic.findOne({
            where: { email: ctx.request.body.email }
        });
        const manager = await ctx.orm.Manager.findOne({
            where: { email: ctx.request.body.email }
        });
        if (mecanic) {
            const compare = await bcrypt.compare(ctx.request.body.password, mecanic.hash_contrasena);
            if (compare) {
                // se crea la session y se agrega a la tabla ademas de el id a la cookie
                const new_session = await ctx.orm.Session.create({
                    userid: mecanic.id
                });
                ctx.session.sessionid = new_session.id;

                 // se crea el jwt
                payload = { Simulaciones: mecanic.Simulacions, type : "Mecanico" };
                var token = JWT.sign(payload, `${process.env.JWT_SECRET}`);

                // se enviará el token
                ctx.response.body = { token: token };

                ctx.status = 201;
            } else {
                ctx.throw("Contraseña incorrecta", 401);
            }
        } else if (tecnic) {
            const compare = await bcrypt.compare(ctx.request.body.password, tecnic.hash_contrasena);
            if (compare) {
                // se crea la session y se agrega a la tabla ademas de el id a la cookie
                const new_session = await ctx.orm.Session.create({
                    userid: tecnic.id
                });
                ctx.session.sessionid = new_session.id;

                // se crea el jwt
                payload = { type : "Tecnic" };
                var token = JWT.sign(payload, `${process.env.JWT_SECRET}`);

                // se enviará el token
                ctx.response.body = { token: token };

                ctx.status = 201;
            } else {
                ctx.throw("Contraseña incorrecta", 401);
            }
        } else if (manager) {
            const compare = await bcrypt.compare(ctx.request.body.password, manager.hash_contrasena);
            if (compare) {
                // se crea la session y se agrega a la tabla ademas de el id a la cookie
                const new_session = await ctx.orm.Session.create({
                    userid: manager.id
                });
                ctx.session.sessionid = new_session.id;

                // se crea el jwt
                payload = { type : "Manager" };
                var token = JWT.sign(payload, `${process.env.JWT_SECRET}`);

                // se enviará el token
                ctx.response.body = { token: token };

                ctx.status = 201;
            } else {
                ctx.throw("Contraseña incorrecta", 401);
            }
        } else{
            console.log("No encontrado");
            ctx.throw("Usuario con ese email no encontrado", 404);
        }
        
        
    } catch (error) {
        console.log(error);
        ctx.throw(error);
    }
});

router.post('/signup', async (ctx) => {
    try {
        if (ctx.request.body.type === "Mecanic"){
            const hash_contraseña = await bcrypt.hash(ctx.request.body.password, 5);
            const mecanic = await ctx.orm.Mecanic.create({
            nickname: ctx.request.body.nickname,
            email: ctx.request.body.email,
            hash_contrasena: hash_contraseña
            });
            ctx.status = 201;
        } else if (ctx.request.body.type === "Manager"){
            const hash_contraseña = await bcrypt.hash(ctx.request.body.password, 5);
            const mecanic = await ctx.orm.Manager.create({
            nickname: ctx.request.body.nickname,
            email: ctx.request.body.email,
            hash_contrasena: hash_contraseña
            });
            ctx.status = 201;
        } else if (ctx.request.body.type === "Tecnic"){
            const hash_contraseña = await bcrypt.hash(ctx.request.body.password, 5);
            const mecanic = await ctx.orm.Tecnic.create({
            nickname: ctx.request.body.nickname,
            email: ctx.request.body.email,
            hash_contrasena: hash_contraseña
            });
            ctx.status = 201;
        } else {
            ctx.throw("Tipo de usuario no válido", 400);
        }
        
        
    } catch (error) {
        ctx.throw(error);
    }
});

router.post('/logout', async (ctx) => {
    try {
        await ctx.orm.Session.destroy({
            where: { id: `${ctx.session.sessionid}` }
        });
        ctx.session.sessionid = undefined;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(error);
    }
})

module.exports = router;

