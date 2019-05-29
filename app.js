const Koa = require('koa');
const koaBody = require('koa-body');
const render = require('koa-ejs'); 
const path = require('path');
const Router = require('koa-router');

const objects = require('./routes/objects');


const app = module.exports = new Koa();

var router = new Router();

app.use(koaBody());
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});


router.get('/', async (ctx, next) => {
  //ctx.body = 'Hello World!';
  await ctx.render('index', {
    
  });
});

app.use(objects.routes()).use(objects.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server started on port ${PORT}`)); 