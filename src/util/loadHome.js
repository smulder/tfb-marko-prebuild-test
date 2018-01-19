
var animateLogoLoad = require('./animateLogoLoad').load;

module.exports = {
  load: function(){
    $('#homeContent').css({display:'block'});
    $('#navPageHolder').css({display:'none'});
    $('.bg').css({display:'block'});
    animateLogoLoad();
  }
};
