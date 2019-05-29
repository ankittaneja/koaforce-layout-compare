const Router = require('koa-router');
var force = require('../helpers/jsforce');
var router = new Router();

var layouts = [] ; 
  // force.getPageLayouts()
  // .then(result => {
  // layouts = result;  
  // })
  // .catch(error => {
  //   console.log(error);
  // });
  
  function main() {
    var initializePromise = force.getPageLayouts();
    initializePromise.then(function(result) {
        layouts = result;
        console.log("Initialized user details");
        // Use user details from here
        console.log(layouts)
    }, function(err) {
        console.log(err);
    })
}
main();

router.get('/objects', async (ctx) => {
  await ctx.render('objects');
});

module.exports = router; 