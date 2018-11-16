//= require jquery
//= require jquery_ujs
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(document).ready(function(e){

$(".custom-select").each(function() {
  var classes = $(this).attr("class"),
      id      = $(this).attr("id"),
      name    = $(this).attr("name");
  var template =  '<div class="' + classes + '">';
      template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
      template += '<div class="custom-options">';
      $(this).find("option").each(function() {
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
      });
  template += '</div></div>';
  
  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-option:first-of-type").hover(function() {
  $(this).parents(".custom-options").addClass("option-hover");
}, function() {
  $(this).parents(".custom-options").removeClass("option-hover");
});
$(".custom-select-trigger").on("click", function() {
  $('html').one('click',function() {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});
$(".custom-option").on("click", function() {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
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



