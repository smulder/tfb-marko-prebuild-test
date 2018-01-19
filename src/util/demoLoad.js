var lassoLoader = require('lasso-loader');

/*----------------------------------------------
                  OBJECTS
----------------------------------------------*/
exports.TF = TF = require('./demoTF').TF;

/*----------------------------------------------
             INITIAL DOCUMENT LOAD
----------------------------------------------*/
require('./initialPageLoad');

/*----------------------------------------------
              REQUIRE HISTORY
----------------------------------------------*/
TF.history = require('history').createBrowserHistory;
TF.history = TF.history();
