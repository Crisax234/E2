const Router = require('koa-router');
//const auth_middle = require('./middlewares/auth');

//const jwt = require('koa-jwt');
const tickets = require('./routes/tickets');
const requests = require('./routes/requests');


const router = new Router();


router.use('/tickets', tickets.routes());
router.use('/requests,', requests.routes());

//router.use(jwt({ secret: process.env.JWT_SECRET, key: 'tokendata' }));

//router.use(protected.routes());

module.exports = router;