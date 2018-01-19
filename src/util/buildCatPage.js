var lassoLoader = require('lasso-loader');

module.exports = {
	buildCatPage: function(data,skipRerender,internalNav,cached){
		var _that = this;

		var locInternalNav = internalNav,
		_data = JSON.parse(JSON.stringify(data));

		this.setPageType('cat');

		function recordNavState(){
			$('#homeContent').animate({opacity:0},150);
			$('#navPageHolder').animate({opacity:1},150,function(){
				$('#catProdHolder').css({display:'block'}).animate({opacity:1});
			});
			_that.setCurCatID(data.catID);

			if(!locInternalNav){
				_that.handleStateChange();
			}
		}

		function displayWidget(){
			var prodCelWidget = require('marko/components').getComponentForEl('catProdHolder');
			if(prodCelWidget){
				prodCelWidget.handleReRender(_data);
			}else{
				lassoLoader.async(function(err){
					if(err){
						console.log('error loading lasso-async dep: ', err);
					}
					prodCelWidget = require('../components/cat-prod-widget');
					prodCelWidget.renderSync(_data).appendTo(document.getElementById('catProdList')).getComponent();
				});
			}

			// ORIGINAL METHOD
			/*
			var catWidget = require('marko/components').getComponentForEl('sideNavCats');
			catWidget.handleReRender(_data, recordNavState);
			*/

			//ATTEMPT AT LAZY LOADING SIDE NAV

			var catWidget = require('marko/components').getComponentForEl('sideNavCats');
			if(catWidget){
				catWidget.handleReRender(_data, recordNavState);
			}else{
				lassoLoader.async(function(err){
					if(err){
						console.log('error loading lasso-async dep: ', err);
					}
					catWidget = require('../components/side-nav-widget');
					catWidget.renderSync(_data).appendTo(document.getElementById('sideNav')).getComponent();
				});
			}

		}
		displayWidget();
	}
};
