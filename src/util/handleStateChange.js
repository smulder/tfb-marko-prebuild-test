module.exports = {
	handleStateChange: function(){
		//console.log('$(document).scrollTop();', $(document).scrollTop());
		//console.log('TF.isMobile',TF.isMobile);
		if(TF.isMobile){
			st = $(document).scrollTop();
		}else{
			if($('#wrapper').css('overflow') == 'visible'){
				st = -parseInt($('#wrapper').css('margin-top'));
			}else{
				st = $('#wrapper').scrollTop();
			}
		}

		//console.log('stAAAAAAAAA', st);

		var curLocation = TF.history.location;
		curLocation.state.st = st;
		curLocation.state.page = TF.state.page || 0;
		curLocation.state.catProdCount = TF.state.catProdCount;
		curLocation.state.loggedIn = TF.state.loggedIn;
		TF.history.replace(curLocation);
		var newHistoryObj = JSON.parse(JSON.stringify(TF.state));
		TF.history.push({
			pathname: newHistoryObj.path,
			search: '',
			state: newHistoryObj
		});
		//TODO -- TURN ON FOR LIVE SITE
		//loadDeviceJs();
	}
};
