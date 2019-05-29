const Router = require('koa-router');

var router = new Router();

router.get('/objects', async (ctx) => {
  await ctx.render('objects');
});

module.exports = router;