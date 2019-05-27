const Koa = require('koa');
const koaBody = require('koa-body');
const render = require('koa-ejs'); 
const path = require('path');
const Router = require('koa-router');
const jsForce = require('jsforce');

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
  //  ctx.body = 'Hello World!';

});

var username = 'ankit.taneja@competitionline.com.rolestest';
var password = 'Online@2019QSNTP6GRtYPCbRYr9of5IgQ6';

var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
   loginUrl : 'https://test.salesforce.com'
});
conn.login(username, password, function(err, userInfo) {
  if (err) { return console.error(err); }
  
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  conn.tooling.query("Select Id, Name, TableEnumOrId from Layout where TableEnumorId = 'Account'", function(err, result) {
    if (err) { return console.error(err); }
    console.log("total : " + result.totalSize);
    console.log(result.done);
    console.log("fetched : " + result.records.length);
    
  });
});


app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server started on port ${PORT}`)); 