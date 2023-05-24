const Router = require('koa-router');
//const auth_middle = require('./middlewares/auth');
const simulaciones = require('./routes/simulaciones');
const mecanics = require('./routes/mecanics');
const managers = require('./routes/managers');
const tecnics = require('./routes/tecnics');
const auth = require('./routes/auth');
const protected = require('./routes/protected');
const solicitudes = require('./routes/solicitudes');
const pieza_simulacions = require('./routes/pieza_simulacions');
const piezas = require('./routes/piezas');
const dashboard = require('./routes/dashboard');
//const jwt = require('koa-jwt');
const tickets = require('./routes/tickets');


const router = new Router();

//router.use('/auth', auth.routes());

//router.use('/simulaciones', auth_middle, simulaciones.routes());
//router.use('/mecanics', auth_middle, mecanics.routes());
//router.use('/managers', auth_middle, managers.routes());
//router.use('/tecnics', auth_middle, tecnics.routes());
//router.use('/solicitudes', auth_middle, solicitudes.routes());
//router.use('/pieza_simulacions', auth_middle, pieza_simulacions.routes());
//router.use('/piezas', auth_middle, piezas.routes());
//router.use('/dashboard', auth_middle, dashboard.routes());
router.use('/tickets', tickets.routes());

//router.use(jwt({ secret: process.env.JWT_SECRET, key: 'tokendata' }));

//router.use(protected.routes());

module.exports = router;