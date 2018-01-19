module.exports = {
	load: function(){
		var TF = window.TF;
		setTimeout(function(){
			TF.animating = true;
			$('#logoDS').css({display:'block',opacity:0});
			$('#logo').css({display:'block'});
			$('#logo').animate({opacity:1},300);
		},200);
	}
};
