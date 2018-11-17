//= require jquery
//= require jquery_ujs
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(document).ready(function(e){

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
		$("nav a").removeClass("active");		
		$(this).addClass("active");			
		event.preventDefault();		
		$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top}, 1000);		
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
	
/* ------------------------------------------------------------ Responsive --------------------------------------------------------- */
	
	
	
/* -------------------- Menu - Icon-------------------- */
		
	$(".icon-menu").click(function(e) {
		$(".mask-window").fadeIn(300);
		$(".menu-animate").animate({"margin-left" : "-400px"}, 300);
	});
	
	$(".mask-window").click(function(e) {
		$(this).fadeOut(400);
		$(".menu-animate").animate({"margin-left" : "0px"}, 100);
	});
	
	$(".seta").click(function(e) {
		$(".menu-animate").animate({"margin-left" : "0px"}, 100);
    });
	
/*  ------------------------------ Menu  ------------------------------ */	

	$(".nav a").click(function(e) { 
		$(".nav a").removeClass("active"); 
		$(this).addClass("active");		
		event.preventDefault(); 
		$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top}, 1000);
		$(".menu-animate").animate({"margin-left" : "0px"}, 300); 
    });
	
/*  ------------------------------ Section Objetivos  ------------------------------ */	
	
	/*var imgObj = $(".home-objetivos img").innerHeight();
	$(".home-objetivos").css({"height":imgObj});*/
	
	
	
});



