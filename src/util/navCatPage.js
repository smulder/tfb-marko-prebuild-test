module.exports = {
	navPage: function(event,catID,internalNav){
		//console.log('*********** IN NAV TO CATEGORY **************');
		var _that = this;

		if(event){
			event.preventDefault();
			event.stopPropagation();
		}


		if(_that.state.path != '/cat/' + catID || internalNav){
			var cached = false,
			msg;

			this.setPageType('cat');

			this.setCurCatID(catID);

			finishHomeShrink();

			var request = $.ajax({
				url: "/cat/" + catID,
				method: "POST",
				data: { },
				dataType: "json"
			});

			request.done(function(msg){
				wrapUpResp(msg);
			});

			request.fail(function( jqXHR, textStatus ) {
				console.log( "Request failed getting category: " + textStatus, jqXHR);
			});

		}else{
			skipLoad = true;
		}

		function wrapUpResp(msg){

			_that.state.path = '/cat/' + catID;
			_that.state.navFunc = 'navPage';

			if(!internalNav){
				internalNav = true;
				_that.handleStateChange();
			}

			$.extend(TF.state,msg);

			console.log('here------- in navCatPage.js about to call buildCatPage');

			if($('.bg').is(':visible')){
				$('#navPageHolder').css({opacity:0});
				$('#navPageHolder').css({display:'block'});
				_that.buildCatPage(msg,false,internalNav,cached);
			}else{
				_that.buildCatPage(msg,false,internalNav,cached);
			}
		}

		function finishHomeShrink(){
			$('#navPageHolder').css({display:'block'});
		}

		return false;
	}
};
