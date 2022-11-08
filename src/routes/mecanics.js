const Router = require('koa-router');

const router = new Router();

router.get('mecanic.show', '/profile', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const mecanicid = session.userid;
    const mecanic = await ctx.orm.Mecanic.findByPk(mecanicid,
      {
        include: [
          { model: ctx.orm.Play },
          { mode: ctx.orm.Simulacion },
        ],
      },
    );
    ctx.body = mecanic;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

// This endpoint is only to show how to call the ORM in this implementation, 
// could be changed for a test.

// GET players/:playerId/matchesCurrentPlayer
//router.get('players.matches', '/:id/matchesCurrentPlayer', async (ctx) => {
//  try {
//    const player = await ctx.orm.Player.findByPk(ctx.params.id, {
//      include: [
//        { model: ctx.orm.Match, as: 'matchesCurrentPlayer' },
//      ],
//    });
//
//    ctx.body = player.matchesCurrentPlayer;
//  } catch (error) {
//    console.log(error);
//    ctx.throw(404);
//  }
//});
module.exports = router;
