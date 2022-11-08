const Router = require('koa-router');
const auth_middle = require('./middlewares/auth');
const simulaciones = require('./routes/simulaciones');
const mecanics = require('./routes/mecanics');
const plays = require('./routes/plays');
const auth = require('./routes/auth');
const protected = require('./routes/protected');
const jwt = require('koa-jwt');


const router = new Router();

router.use('/auth', auth.routes());

router.use('/simulaciones', auth_middle, simulaciones.routes());
router.use('/mecanics', auth_middle, mecanics.routes());
router.use('/plays', auth_middle, plays.routes());

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'tokendata' }));

router.use(protected.routes());

module.exports = router;