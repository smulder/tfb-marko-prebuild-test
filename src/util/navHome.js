var lassoLoader = require('lasso-loader');

module.exports = {
	navHome: function(event,internalNav){
		if(event){
			event.preventDefault();
		}

		var _that = this;

		lassoLoader.async(function(err){
			var homeContent = $('#homeContent');
			if(!homeContent.length){
				console.log('------- Home Content did not exist so we will load async with lassoLoader here -------');
				homeContent = require('../pages/home/staticContent.marko');
				homeContent.renderSync({pageType:'home',ua:TF.state.ua}).appendTo('container');
				hideCategoryHolder();
			}else{
				hideCategoryHolder();
			}
		});

		function showHomeCont(){
			$('#homeContent').css({display:'block'}).animate({opacity:1},150);
		}
		function hideCategoryHolder(){
			$('#navPageHolder').animate({opacity:0},200,function(){
				$(this).css({display:'none'});
				showHomeCont();
			});
		}

		TF.state.path = '/';
		TF.state.navFunc = 'navHome';
		if(!internalNav){
			_that.handleStateChange();
		}

		return false;
	}
};
