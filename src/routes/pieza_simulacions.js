const Router = require('koa-router');

const router = new Router();

// Agregar una pieza a una simulacion
router.post('pieza_simulacions.create', '/', async (ctx) => {
    try {
      const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
      const mecanicid = session.userid;
      const tecnic = session.tecnicid;
      const manager = session.managerid;
      if (mecanicid || tecnic || manager) {
        //buscamos el auto, para poner los valores de fabrica
        if (ctx.request.body.tipo === "Performance"){
            //obtenemos la categoria de la pieza
            const pieza_actual = await ctx.orm.Performance.findByPk(ctx.request.body.id_pieza);
            const categoria_actual = pieza_actual.categoria;
            const hp = pieza_actual.hp;
            const torque = pieza_actual.torque;
            const precio = pieza_actual.precio;
            var agregar_pieza = false;
            //obtenemos la simulacion que queremos modificar
            const simulacion_actual_modificar = await ctx.orm.Simulacion.findByPk(ctx.request.body.id_simulacion, {
                include: [
                    { model: ctx.orm.Mecanic, required: false },
                    { model: ctx.orm.Car, required: false },
                    { model: ctx.orm.Solicitud, required: false },
                    { model: ctx.orm.Performance, required: false },
                    { model: ctx.orm.Look, required: false },
                ],
            });
            
            if (categoria_actual == "Intercooler"){
                if(simulacion_actual_modificar.intercoolerId){
                    ctx.throw("Ya tiene un intercooler", 404);
                }else{
                    simulacion_actual_modificar.intercoolerId = ctx.request.body.id_pieza;
                    agregar_pieza = true;
                }
            }else if(categoria_actual == "ChargePipe"){
                if (simulacion_actual_modificar.chargepipeId){
                    ctx.throw("Ya tiene un chargePipe", 404);
                }else{
                    simulacion_actual_modificar.chargepipeId = ctx.request.body.id_pieza;
                    agregar_pieza = true;
                }

            }else if(categoria_actual == "Turbo"){
                if (simulacion_actual_modificar.turboId){
                    ctx.throw("Ya tiene un turbo", 404);
                }else{
                    simulacion_actual_modificar.turboId = ctx.request.body.id_pieza;
                    agregar_pieza = true;
                }
            }
            if (agregar_pieza){
                simulacion_actual_modificar.hp = simulacion_actual_modificar.hp + hp;
                simulacion_actual_modificar.torque = simulacion_actual_modificar.torque + torque;
                simulacion_actual_modificar.costo = simulacion_actual_modificar.costo + precio;
                simulacion_actual_modificar.save();
                ctx.throw(simulacion_actual_modificar.dataValues, 201);
            }else{
                ctx.throw("No se puede agregar la pieza solicitada", 404);
            }
            
        }else if(ctx.request.body.tipo === "Look"){
            //obtenemos la categoria de la pieza
            const pieza_actual = await ctx.orm.Look.findByPk(ctx.request.body.id_pieza);
            const categoria_actual = pieza_actual.categoria;
            const precio = pieza_actual.precio;
            var agregar_pieza = false;
            //obtenemos la simulacion que queremos modificar
            const simulacion_actual_modificar = await ctx.orm.Simulacion.findByPk(ctx.request.body.id_simulacion, {
                include: [
                    { model: ctx.orm.Mecanic, required: false },
                    { model: ctx.orm.Car, required: false },
                    { model: ctx.orm.Solicitud, required: false },
                    { model: ctx.orm.Performance, required: false },
                    { model: ctx.orm.Look, required: false },
                ],
            });
            
            if (categoria_actual == "Llanta"){
                if(simulacion_actual_modificar.llantaId){
                    ctx.throw("Ya tiene un set de Llantas", 404);
                }else{
                    simulacion_actual_modificar.llantaId = ctx.request.body.id_pieza;
                    agregar_pieza = true;
                }
            }else if(categoria_actual == "Neumatico"){
                if (simulacion_actual_modificar.neumaticoId){
                    ctx.throw("Ya tiene un set de Neumaticos", 404);
                }else{
                    simulacion_actual_modificar.neumaticoId = ctx.request.body.id_pieza;
                    agregar_pieza = true;
                }

            }else if(categoria_actual == "Capot"){
                if (simulacion_actual_modificar.capotId){
                    ctx.throw("Ya tiene un capot", 404);
                }else{
                    simulacion_actual_modificar.capotId = ctx.request.body.id_pieza;
                    agregar_pieza = true;
                }
            }
            if (agregar_pieza){
                simulacion_actual_modificar.costo = simulacion_actual_modificar.costo + precio;
                simulacion_actual_modificar.save();
                ctx.throw(simulacion_actual_modificar.dataValues, 201);
            }else{
                ctx.throw("No se puede agregar la pieza solicitada", 404);
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

  //cambiar una pieza de una simulacion
router.post('pieza_simulacions.create', '/change', async (ctx) => {
    try {
      const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
      const mecanicid = session.userid;
      const tecnic = session.tecnicid;
      const manager = session.managerid;
      if (mecanicid || tecnic || manager) {
        //buscamos el auto, para poner los valores de fabrica
        if (ctx.request.body.tipo === "Performance"){
            //obtenemos la categoria de la pieza
            const pieza_actual = await ctx.orm.Performance.findByPk(ctx.request.body.id_pieza);
            const categoria_actual = pieza_actual.categoria;
            const hp = pieza_actual.hp;
            const torque = pieza_actual.torque;
            const precio = pieza_actual.precio;
            var agregar_pieza = false;
            //obtenemos la simulacion que queremos modificar
            const simulacion_actual_modificar = await ctx.orm.Simulacion.findByPk(ctx.request.body.id_simulacion, {
                include: [
                    { model: ctx.orm.Mecanic, required: false },
                    { model: ctx.orm.Car, required: false },
                    { model: ctx.orm.Solicitud, required: false },
                    { model: ctx.orm.Performance, required: false },
                    { model: ctx.orm.Look, required: false },
                ],
            });
            var hp_antigua = null;
            var torque_antigua = null;
            var precio_antigua = null;

            if (categoria_actual == "Intercooler"){
                
                const pieza_antigua = await ctx.orm.Performance.findByPk(simulacion_actual_modificar.intercoolerId);
                hp_antigua = pieza_antigua.hp;
                torque_antigua = pieza_antigua.torque;
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.intercoolerId = ctx.request.body.id_pieza;
                agregar_pieza = true;                
            }else if(categoria_actual == "ChargePipe"){
                const pieza_antigua = await ctx.orm.Performance.findByPk(simulacion_actual_modificar.chargepipeId);
                
                hp_antigua = pieza_antigua.hp;
                torque_antigua = pieza_antigua.torque;
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.chargepipeId = ctx.request.body.id_pieza;
                agregar_pieza = true;
                
            }else if(categoria_actual == "Turbo"){
                const pieza_antigua = await ctx.orm.Performance.findByPk(simulacion_actual_modificar.turboId);
                
                hp_antigua = pieza_antigua.hp;
                torque_antigua = pieza_antigua.torque;
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.turboId = ctx.request.body.id_pieza;
                agregar_pieza = true;
            }
            if (agregar_pieza){
                simulacion_actual_modificar.hp = simulacion_actual_modificar.hp - hp_antigua + hp;
                simulacion_actual_modificar.torque = simulacion_actual_modificar.torque - torque_antigua + torque;
                simulacion_actual_modificar.costo = simulacion_actual_modificar.costo - precio_antigua + precio;
                simulacion_actual_modificar.save();
                ctx.throw(simulacion_actual_modificar.dataValues, 201);
            }else{
                ctx.throw("No se puede agregar la pieza solicitada", 404);
            }
            
        }else if(ctx.request.body.tipo === "Look"){
            //obtenemos la categoria de la pieza
            const pieza_actual = await ctx.orm.Look.findByPk(ctx.request.body.id_pieza);
            const categoria_actual = pieza_actual.categoria;
            const precio = pieza_actual.precio;
            var agregar_pieza = false;
            //obtenemos la simulacion que queremos modificar
            const simulacion_actual_modificar = await ctx.orm.Simulacion.findByPk(ctx.request.body.id_simulacion, {
                include: [
                    { model: ctx.orm.Mecanic, required: false },
                    { model: ctx.orm.Car, required: false },
                    { model: ctx.orm.Solicitud, required: false },
                    { model: ctx.orm.Performance, required: false },
                    { model: ctx.orm.Look, required: false },
                ],
            });
            var precio_antigua = null;
            if (categoria_actual == "Llanta"){
                
                const pieza_antigua = await ctx.orm.Performance.findByPk(simulacion_actual_modificar.llantaId);
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.llantaId = ctx.request.body.id_pieza;
                agregar_pieza = true;
                
            }else if(categoria_actual == "Neumatico"){
                const pieza_antigua = await ctx.orm.Performance.findByPk(simulacion_actual_modificar.neumaticoId);
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.neumaticoId = ctx.request.body.id_pieza;
                agregar_pieza = true;
                

            }else if(categoria_actual == "Capot"){
                const pieza_antigua = await ctx.orm.Performance.findByPk(simulacion_actual_modificar.capotId);
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.capotId = ctx.request.body.id_pieza;
                agregar_pieza = true;
                
            }
            if (agregar_pieza){
                simulacion_actual_modificar.costo = simulacion_actual_modificar.costo - precio_antigua + precio;
                simulacion_actual_modificar.save();
                ctx.throw(simulacion_actual_modificar.dataValues, 201);
            }else{
                ctx.throw("No se puede agregar la pieza solicitada", 404);
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

  //cambiar una pieza de una simulacion
  router.post('pieza_simulacions.delete', '/delete', async (ctx) => {
    try {
      const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
      const mecanicid = session.userid;
      const tecnic = session.tecnicid;
      const manager = session.managerid;
      if (mecanicid || tecnic || manager) {
        //buscamos el auto, para poner los valores de fabrica
        if (ctx.request.body.tipo === "Performance"){
            
            var eliminar_pieza = false;
            //obtenemos la simulacion que queremos modificar
            const simulacion_actual_modificar = await ctx.orm.Simulacion.findByPk(ctx.request.body.id_simulacion, {
                include: [
                    { model: ctx.orm.Mecanic, required: false },
                    { model: ctx.orm.Car, required: false },
                    { model: ctx.orm.Solicitud, required: false },
                    { model: ctx.orm.Performance, required: false },
                    { model: ctx.orm.Look, required: false },
                ],
            });
            var hp_antigua = 0;
            var torque_antigua = 0;
            var precio_antigua = 0;

            if (ctx.request.body.categoria == "Intercooler"){
                
                const pieza_antigua = await ctx.orm.Performance.findByPk(simulacion_actual_modificar.intercoolerId);
                hp_antigua = pieza_antigua.hp;
                torque_antigua = pieza_antigua.torque;
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.intercoolerId = null;
                eliminar_pieza = true;                
            }else if(ctx.request.body.categoria == "ChargePipe"){
                const pieza_antigua = await ctx.orm.Performance.findByPk(simulacion_actual_modificar.chargepipeId);
                
                hp_antigua = pieza_antigua.hp;
                torque_antigua = pieza_antigua.torque;
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.chargepipeId = null;
                eliminar_pieza = true;
                
            }else if(ctx.request.body.categoria == "Turbo"){
                const pieza_antigua = await ctx.orm.Performance.findByPk(simulacion_actual_modificar.turboId);
                
                hp_antigua = pieza_antigua.hp;
                torque_antigua = pieza_antigua.torque;
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.turboId = null;
                eliminar_pieza = true;
            }
            if (eliminar_pieza){
                simulacion_actual_modificar.hp = simulacion_actual_modificar.hp - hp_antigua;
                simulacion_actual_modificar.torque = simulacion_actual_modificar.torque - torque_antigua;
                simulacion_actual_modificar.costo = simulacion_actual_modificar.costo - precio_antigua;
                simulacion_actual_modificar.save();
                ctx.throw(simulacion_actual_modificar.dataValues, 201);
            }else{
                ctx.throw("No se puede agregar la pieza solicitada", 404);
            }
            
        }else if(ctx.request.body.tipo === "Look"){

            var eliminar_pieza = false;
            //obtenemos la simulacion que queremos modificar
            const simulacion_actual_modificar = await ctx.orm.Simulacion.findByPk(ctx.request.body.id_simulacion, {
                include: [
                    { model: ctx.orm.Mecanic, required: false },
                    { model: ctx.orm.Car, required: false },
                    { model: ctx.orm.Solicitud, required: false },
                    { model: ctx.orm.Performance, required: false },
                    { model: ctx.orm.Look, required: false },
                ],
            });
            var precio_antigua = 0;
            if (ctx.request.body.categoria == "Llanta"){
                
                const pieza_antigua = await ctx.orm.Look.findByPk(simulacion_actual_modificar.llantaId);
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.llantaId = null;
                eliminar_pieza = true;
                
            }else if(ctx.request.body.categoria == "Neumatico"){
                const pieza_antigua = await ctx.orm.Look.findByPk(simulacion_actual_modificar.neumaticoId);
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.neumaticoId = null;
                eliminar_pieza = true;
                

            }else if(ctx.request.body.categoria == "Capot"){
                const pieza_antigua = await ctx.orm.Look.findByPk(simulacion_actual_modificar.capotId);
                precio_antigua = pieza_antigua.precio;
                simulacion_actual_modificar.capotId = null;
                eliminar_pieza = true;
                
            }
            if (eliminar_pieza){
                simulacion_actual_modificar.costo = simulacion_actual_modificar.costo - precio_antigua;
                simulacion_actual_modificar.save();
                ctx.throw(simulacion_actual_modificar.dataValues, 201);
            }else{
                ctx.throw("No se puede eliminar la pieza solicitada", 404);
            }
        }else {
            ctx.throw("no se selecciona el tipo de pieza",404);
        }
    }else{
        ctx.throw("No eres ni mecanico ni tecnico, no puedes eliminar piezas a la simulacion", 404);
    }
    } catch (error) {
      ctx.throw(error);
    }
  });

  module.exports = router;