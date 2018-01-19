
var TF = new TFGen();
TF.getTFState();

exports.TF = TF;

function TFGen(){

	var _that = this;

	this.testFlag = true;

	this.state = {};
	this.cache = {};

	this.setCurCatID = function(cat){
		this.state.curCatID = cat;
	};
	
	this.setPageType = function(type){
		this.state.pageType = type;
	};

	this.getTFState = function(){
		this.state = {
			testStateFlag:true
		};
	};

	/*----------------------------------------------
	NAVIGATE TO HOMEPAGE
	----------------------------------------------*/
	this.navHome = require('./navHome').navHome;

	/*----------------------------------------------
	NAVIGATE TO CATEGORY PAGE
	----------------------------------------------*/
	this.navPage = require('./navCatPage').navPage;

	/*----------------------------------------------
	DISPLAY PRODUCTS on CATEGORY PAGE
	----------------------------------------------*/
	this.buildCatPage = require('./buildCatPage').buildCatPage;

	/*----------------------------------------------
	RECORD HISTORY STATE
	----------------------------------------------*/
	this.handleStateChange = require('./handleStateChange').handleStateChange;

}
