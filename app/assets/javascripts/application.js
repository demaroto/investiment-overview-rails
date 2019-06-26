//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(document).ready(function(e){

	$(".loading-wrapper").delay(3000).fadeOut(1000);
	
/* ------ Alerta - Painel ----- */
	
	$('.obs').delay(3000).fadeOut(1000);

	
/* -------------------- Menu - Painel -------------------- */
		
	$(".icon-menu").click(function(e) {
		$(".mask-window").fadeIn(300);
		if($(window).innerWidth() > 1023){
			$(".menu-animate").animate({"margin-left" : "-400px"}, 100);
		}
		else{
			$(".menu-animate").animate({"margin-left" : "-70%"}, 100);
		}
	});
	
	$(".icon-menu2").click(function(e) {
		$(".mask-window").fadeIn(300);
		$(".menu-animate-resp").animate({"margin-left" : "-70%"}, 300);
	});
	
	$(".mask-window").click(function() {
		$(this).fadeOut(400);
		$(".menu-animate").animate({"margin-left" : "0px"}, 100);
		$(".menu-animate-resp").animate({"margin-left" : "0px"}, 300);
	});
	
	$(".seta").click(function(e) {
		$(".menu-animate-resp").animate({"margin-left" : "0px"}, 300);
  });
	
	$(".nav a").click(function(e) { 
		$(".nav a").removeClass("active"); 
		$(this).addClass("active");		
		event.preventDefault(); 
		if($(this).attr('href') == "#1"){
			$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top - 100}, 1000);
		}
		else{
			$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top}, 1000);
		}
		$(".menu-animate").animate({"margin-left" : "0px"}, 300); 
  });
  
  /* Mobile - Home */
  
  $(".nav-resp a").click(function(e) { 
  	$(".mask-window").fadeOut(300);
		$(".nav-resp a").removeClass("active"); 
		$(this).addClass("active");		
		event.preventDefault(); 
		if($(this).attr('href') == "#1"){
			$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top - 100}, 1000);
		}
		else{
			$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top}, 1000);
		}
		$(".menu-animate-resp").animate({"margin-left" : "0px"}, 300); 
  });
  
  /* ---------- Input File ---------- */			
	
  $('#dropzone').on('dragover', function() {
    $(this).addClass('hover');
  });
  
  $('#dropzone').on('dragleave', function() {
    $(this).removeClass('hover');
  });
  
  $('#dropzone input').on('change', function(e) {
    var file = this.files[0];

    $('#dropzone').removeClass('hover');
    
    if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
      return alert('File type not allowed.');
    }
    
    $('#dropzone').addClass('dropped');
    $('#dropzone img').remove();
    
    if ((/^image\/(gif|png|jpeg)$/i).test(file.type)) {
      var reader = new FileReader(file);

      reader.readAsDataURL(file);
      
      reader.onload = function(e) {
        var data = e.target.result,
            $img = $('<img />').attr('src', data).fadeIn();
        
        $('#dropzone div').html($img);
      };
    } else {
      var ext = file.name.split('.').pop();
      
      $('#dropzone div').html(ext);
    }
    
  });

/* ---------- Window Scroll ---------- */	
	
	$(window).scroll(function(){
		
		if($(this).scrollTop() > 0){
			$("header").addClass("header-active");
		}
		
		else{
			$("header").removeClass("header-active");
		}
		
	});

/* ---------- Menu ---------- */	

	$("nav a").click(function(e){		
			event.preventDefault();		
			if($(this).attr("href") == "#1"){
					if($(window).innerWidth() > 1023){
						$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top - 150}, 1000);	
					}
					else{
						$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top - 200}, 1000);	
					}
			}
			
			else if($(this).attr("href") == "#2"){
					$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top - 50}, 1000);			
			}
			
			else if($(this).attr("href") == "#3"){
					$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top - 130}, 1000);			
			}
	});
	
	$(".btn-home-login").click(function(){
		window.location.href = "/users/sign_in";	
	});
	
	$(".btn-home-experimentar").click(function(){
		window.location.href = "/users/sign_up";	
	});
	
	$(".btn-home-registrar").click(function(){
		window.location.href = "/users/sign_up";	
	});
	
	$(".btn-home-login2").click(function(){
		window.location.href = "/users/sign_in";	
	});
	
	$(".btn-painel-sair").click(function(){
		window.location.href = "/users/sign_out/";	
	});
	
	$(".btn-painel-perfil").click(function(){
		window.location.href = "/users/edit/";	
	});
	
	$(".redir-cadastro").click(function(){
		window.location.href = "/users/sign_up/";	
	});
	
	$(".redir-login").click(function(){
		window.location.href = "/users/sign_in";	
	});
	
	$(".logo-header-home").click(function(){
		window.location.href = "/";
	});
	
	$(".logo-header-painel").click(function(){
		window.location.href = "/";
	});

	/*  ------------------------------ Contato  ------------------------------ */	
	
	$(".btn-contato-sb").click(function(){

			if($(".contato2").hasClass("contato-aberto")){
					$(".contato2").slideUp(500);
					$(".contato2").removeClass("contato-aberto");
					if($(window).innerWidth() > 1023){
						$("html, body").animate({scrollTop: $('.contato').offset().top - 88}, 800);
					}
					else{
						$("html, body").animate({scrollTop: $('.contato').offset().top - 58}, 800);
					}
			}
			
			else{
					$(".contato2").slideDown(500);	
					if($(window).innerWidth() > 1023){
						$("html, body").animate({scrollTop: $('.contato2').offset().top - 88}, 800);
					}
					else{
						$("html, body").animate({scrollTop: $('.contato2').offset().top - 58}, 800);
					}
					$(".contato2").addClass("contato-aberto");	
			}
			// $("html, body").animate({scrollTop: $($(this).attr('href')).offset().top}, 1000);		
	});
	
	/* ------ Input[type=range] ----- */
	
	$('input[type=range]').on('input', function(e){
	  var min = e.target.min,
		  max = e.target.max,
		  val = e.target.value;

	  $(e.target).css({
			'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
	  });
	  
	}).trigger('input');
	
	var $range = document.querySelector('input[type=range]');
  var	$value = document.querySelector('.contato2 h5');
	
	$range.addEventListener('input', function() {
			$value.textContent = this.value;
	});
	
	
});



