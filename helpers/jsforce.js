const util = require('util');
var jsForce = require('jsforce');

// Need to later get from user input plus persist in some database
var username = 'ankit.taneja@competitionline.com.rolestest';
var password = 'Online@2019QSNTP6GRtYPCbRYr9of5IgQ6';

module.exports = {
    getPageLayouts() { 
      return new Promise(function(resolve,reject) {
      var conn = new jsForce.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl : 'https://test.salesforce.com'
      });
      conn.login(username, password, function(err, userInfo) {
        
        if (err) { return console.error(err); }

        conn.metadata.describe('39.0', async function(err, metadata) {
          if (err) { return console.error('err', err); }
          
          await metadata;
          console.log('Meta:' + metadata.length);
          
          for (var i=0; i < metadata.length; i++) {
            var meta = metadata[i];
            console.log("organizationNamespace: " + meta.organizationNamespace);
            console.log("partialSaveAllowed: " + meta.partialSaveAllowed);
            console.log("testRequired: " + meta.testRequired);
            console.log("metadataObjects count: " + metadataObjects.length);
          }
          
        });
        conn.tooling.query("Select Id, EntityDefinitionId, Name, TableEnumOrId from Layout where TableEnumorId = 'Account'", function(err, result) {
          if (err) { return console.error(err); }
          var totalLayout = [] = result.records;
          
          for (var i=0; i < totalLayout.length; i++) {
            var record = totalLayout[i];
            console.log('Name: ' + record.Name);
            conn.tooling.sobject('Layout')
              .find(
                { Id: record.Id },
                "FullName, Name, Metadata"
              )
              .execute(function(err, records) {
                if (err) { return console.error(err); }

                for (var i=0; i < records.length; i++) {
                  var record = records[i];
                  // console.log('Metadata: ' + util.inspect(record.Metadata, { showHidden: true, depth: null, colors: true }));
                  //console.log(record.Metadata);
                    if (record.Name === 'Architekten / Ingenieure Portal Büro Account Layout') {  
                      // console.log('Namehere: ' + record.FullName);
                      // console.log('Metadata: ' + util.inspect(record.Metadata, { showHidden: true, depth: null, colors: true }));
                      var thisreturn = [] = util.inspect(record.Metadata, { showHidden: true, depth: null, colors: true });
                      resolve(thisreturn);
                    } else {
                      rejetc(Error('No Layout found'));
                    }
                  }
              });
            }    
          });
      });
    })
  }
}
