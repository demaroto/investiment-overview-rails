// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

// JavaScript Document

$(document).ready(function(e){

/* ---------- Window Scroll ---------- */	
	
	var home = $(window).innerHeight() - 1;
	var sobre = home + $(".sobre").innerHeight();
	var servicos = sobre + $(".servicos").innerHeight();
	var contato = servicos + $(".contato").innerHeight();
	
	$(window).scroll(function(){
		
		if($(this).scrollTop() > 0){
			$("header").addClass("header-active");
		}
		
		else{
			$("header").removeClass("header-active");
		}
		
		if($(this).scrollTop() < home)
		{
			$("#sobre").removeClass("active");
		}
		
		if(($(this).scrollTop() > home) && ($(this).scrollTop() < sobre))
		{
			$("#sobre").addClass("active");	
			$("#servicos").removeClass("active");
		}
		
		else if(($(this).scrollTop() > sobre) && ($(this).scrollTop() < servicos))
		{
			$("#servicos").addClass("active");
			$("#sobre").removeClass("active");
			$("#contato").removeClass("active");
		}
		
		else if(($(this).scrollTop() > servicos) && ($(this).scrollTop() < contato))
		{
			$("#contato").addClass("active");
			$("#servicos").removeClass("active");
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
	
	/* ---------- Contato ---------- */	
	
	$("#btn-enviar").click(function(e){

        var dados = $("#form").serialize();
        
		if($("#nome").val() == "")
		{
			$("#erro-nome").fadeIn(300);
			$("#erro-nome").delay(2000).fadeOut(1000);
		}
		
		else
		{
			$("#erro-nome").fadeOut(300);
			
			if($("#email").val() == "")
			{
				$("#erro-email").delay(300).fadeIn(300);
				$("#erro-email").delay(2000).fadeOut(1000);
				
			}
			
			else
			{
				$("#erro-email").fadeOut(300);
					
				if($("#tel").val() == "")
				{
					$("#erro-telefone").delay(300).fadeIn(300);
					$("#erro-telefone").delay(2000).fadeOut(1000);
				}	
				
				else
				{
					$("#erro-telefone").fadeOut(300);
					
					if($("#mensagem").val() == "")
					{
						$("#erro-mensagem").delay(300).fadeIn(300);
						$("#erro-mensagem").delay(2000).fadeOut(1000);
					}

					else
					{
						$("#erro-mensagem").fadeOut(300)
						$("#success").delay(300).fadeIn(300);
						$("#success").delay(3000).fadeOut(1000);

						$.ajax({

							type: "POST", 
							url: "JavaScript/Form.php", 
							dataType:"html", 
							data:dados, 
							success:function(e){                              

								$("#nome").val("");
								$("#email").val("");
								$("#tel").val("");
								$("#mensagem").val("");

							}

						});

					}
					
				}
				
			}
			
		}
		
	});	
	
/* ------------------------------------------------------------ Responsive --------------------------------------------------------- */
	
	
	
/* -------------------- Menu - Icon-------------------- */
		
	$(".icon-menu").click(function(e) {
		$(".menu-animate").animate({"margin-left" : "-70%"}, 300);
	});
	
	$(".seta").click(function(e) {
		$(".menu-animate").animate({"margin-left" : "0px"}, 300);
    });
	
/*  ------------------------------ Menu  ------------------------------ */	

	$(".nav a").click(function(e) { 
		$(".nav a").removeClass("active"); 
		$(this).addClass("active");		
		event.preventDefault(); 
		$("html, body").animate({scrollTop: $($(this).attr('href')).offset().top}, 1000);
		$(".menu-animate").animate({"margin-left" : "0px"}, 300); 
    });
	
	
	
	
	
});



