
module.exports = {
	onInput: function(input) {

		var config = input['w-config'];
		if(config){
			input = config;
		}
		console.log('side nav widget input', input);
		this.state = input;
	},
	handleReRender: function(data, callback){
		this.input = data;
		if(callback){
			callback();
		}
	},
	handleNavToFilter: function(id, filterType, option, closeouts, event, el) {
		if(event){
			event.preventDefault();
		}
		switch(filterType){
			case 'cat':
				TF.setCurCatID(id);
				TF.state.noPush = false;
				TF.navPage(event, id, null);
				break;
			default:
				break;
		}
	},
	onRender: function(){

	},
	onMount: function(){
		// Called once at initial render
	},
	onUpdate: function(){
		// Called every time this is updated
	},
	init: function() {
		var el = this.el;
		console.log('Initializing widget: ' + el.id);
	}
};
