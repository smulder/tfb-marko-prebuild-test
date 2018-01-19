
module.exports = {
    onInput: function(input) {
      if(input['w-config']){
		 input = JSON.parse(JSON.stringify(input['w-config']));
        delete input['w-config'];
      }

      this.state = input;
    },
    handleReRender: function(data){
      this.input = data;
 },
    onMount: function(){
    },
    onUpdate: function(){

    },
    onRender: function(event){

    },
    init: function() {
        var el = this.el;
        console.log('Initializing widget: ' + el.id);
    }
};
