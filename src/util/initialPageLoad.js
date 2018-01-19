/*----------------------------------------------
SETUP HOME
----------------------------------------------*/
var loadHome = require('./loadHome').load;

/*----------------------------------------------
SET-UP SUBPAGE
----------------------------------------------*/
var loadSubPage = require('./loadSubPage').load;

/*----------------------------------------------
GENERAL SETUP
----------------------------------------------*/
var loadAll = require('./loadAll').load;

/*----------------------------------------------
INITIAL DOCUMENT LOAD
----------------------------------------------*/
$(document).ready(function(){

	if(!TFInit || (TFInit && !TFInit.hideHome)){
		TF.state.navFunc = 'navHome';
	}

	/*----------------------------------------------
	LOAD INITIAL PAGE TYPE
	----------------------------------------------*/
	var initLocation;


	switch(TFInit.pageType){
		case 'home':
			TF.state.navFunc = 'navHome';
			TF.state.links = TFInit.links;
			loadHome();
			loadAll();
			TF.state.pageType = 'home';
			break;
		case 'cat':
			loadAll();
			TF.state = JSON.parse(JSON.stringify(TFInit));
			initLocation = TF.history.location;
			initLocation.state = JSON.parse(JSON.stringify(TF.state));
			TF.history.replace(JSON.parse(JSON.stringify(initLocation)));
			loadSubPage();
			break;
		default:
		break;
	}

	/*----------------------------------------------
	INITIAL HISTORY
	----------------------------------------------*/
	initLocation = TF.history.location;
	if(!TF.state.path){
		TF.state.path = window.location.pathname;
	}
	initLocation.state = JSON.parse(JSON.stringify(TF.state));
	TF.history.replace(initLocation);


	// Listen for changes to the current location
	var unlisten = TF.history.listen(function(location, action){
	var locState;
		if(action != 'PUSH' && action != 'REPLACE'){
			var curLocation = location;
			if(curLocation && curLocation.state){
				locState = curLocation.state;
				switch(locState.navFunc){
					case 'navPage':
						console.log('navPage from History ******************');
						TF.state = JSON.parse(JSON.stringify(locState));
						TF.navPage(null,locState.curCatID,true);
						break;
					case 'navHome':
						console.log('navHome from History ******************');
						TF.state = JSON.parse(JSON.stringify(locState));
						TF.navHome(null,true);
						break;
					default:
						break;
				}
			}
		}
	});

});
