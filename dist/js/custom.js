(function($){
	var openMobileMenu = function () {
	  var body = $('body');
	  if (body.hasClass('open')) {
	      closeMobileMenu();
	    } else {
	      body.addClass('open');
	    }
	  }
	  var closeMobileMenu = function () {
	    $('body').removeClass('open');
	  }

	  /* MOBILE MENU */
	  var mobileMenu = $('.js-mobile-menu');
	  $(document).on('click', '.js-mobile-button', function () {
	    openMobileMenu();
	    return false;
	  });

	  $(document).off('click.mobileMenu').on('click.mobileMenu', function (e) {
	    var t = $(e.target);
	    closeMobileMenu(mobileMenu);
	    if (t.closest('.js-mobile-menu').length < 1 && t.closest('.js-mobile-button').length < 1) {
	  	    closeMobileMenu(mobileMenu);
	 	 }
 	  });

 	 // jssocials
	$("#shareIcons").jsSocials({
	    showLabel: false,
	    showCount: true,
	    shares: ["facebook", "twitter", "googleplus", "pinterest"]
	});
})(jQuery);