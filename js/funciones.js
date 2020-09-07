var ancho_ventana = $(window).width();

function mensajeUser(string,tipo)
{
	$("#respuesta").html("<div class='"+tipo+"'>"+string+"</div>");
}

	$(document).ready(function(){
		var $menu = $("#btn_menu");
		var $icon = $("#icon-menu");
		$menu.click(function(){
			var $nav = $("#navegacion");
			$nav.slideToggle();

			if($icon.hasClass("fa-bars"))
			{
				$icon.addClass("fa-times").removeClass("fa-bars");
			}
			else{
				$icon.removeClass("fa-times").addClass("fa-bars");
			}
		});

		//efecto para regresar al inicio de la pagina
		$("#btn_subir").click(function(){
			event.preventDefault();
			$("html,body").animate({
				scrollTop:0
			},300);
		});

		$("nav a").click(function(){
			var enlace = $(this).attr("href");
			$("html,body").animate({
				scrollTop:$(enlace).offset().top
			},500);
		});

		$("#btn_enviar").click(function(){
			event.preventDefault();
			if(validad_formulario())
			{
			var nombre = $("#nombre").val();
			var correo = $("#correo").val();
			var mensaje = $("#mensaje").val();
			var captcha = $("#captcha").val();
			var datos = {
							"txt_nombre":nombre,
							"txt_correo":correo,
							"txt_mensaje":mensaje,
							"txt_captcha":captcha
						};
			$.ajax({
				url:"php/correo.php",
				type:"post",
				data:datos,
				success:
					function(resp)
					{
						mensajeUser(resp,"ok");
						$("#nombre").val("");
						$("#correo").val("");
						$("#mensaje").val("");
						$("#captcha").val("");
						document.getElementById("img_captcha").src="http://www.portafoliooegg.esy.es/php/captcha.php";
						//document.getElementById("img_captcha").src="http://127.0.0.1:8080/curriculum/php/captcha.php";
						/*setTimeout(function() {
							$("#respuesta").hide();
						}, 3000);*/
					}
			});

		}

		});


	});

	function validad_formulario()
	{
		var nombre = $("#nombre");
		var correo = $("#correo");
		var mensaje = $("#mensaje");
		var captcha = $("#captcha");
		var respuesta = $("#respuesta");
		var boleano = false;
		var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(nombre.val() == "")
		{
			mensajeUser("El campo nombre es obligatorio","error");
			nombre.addClass("terror");
			correo.removeClass("terror");
			mensaje.removeClass("terror");
			captcha.removeClass("terror");
		}
		else if(correo.val() == "")
		{
			mensajeUser("El campo correo es obligatorio","error");
			correo.addClass("terror");
			nombre.removeClass("terror");
			mensaje.removeClass("terror");
			captcha.removeClass("terror");
		}
		else if(!(expr.test(correo.val())) ) 
		{
			mensajeUser("El el correo no es valido","error");
			correo.addClass("terror");
			nombre.removeClass("terror");
			mensaje.removeClass("terror");
			captcha.removeClass("terror");	
		}
		else if(mensaje.val() == "")
		{
			mensajeUser("El campo mensaje es obligatorio","error");
			mensaje.addClass("terror");
			nombre.removeClass("terror");
			correo.removeClass("terror");
			captcha.removeClass("terror");
		}
		else if(captcha.val() == "")
		{
			mensajeUser("El campo captcha es obligatorio","error");
			captcha.addClass("terror");
			mensaje.removeClass("terror");
			nombre.removeClass("terror");
			correo.removeClass("terror");
		}
		else
		{
			mensaje.removeClass("terror");
			nombre.removeClass("terror");
			correo.removeClass("terror");
			captcha.removeClass("terror");
			boleano=true;
		}

		return boleano;
	}

	function removerClaseError()
	{

	}


	$(window).resize(function(){
		ancho_ventana = $(window).width();
		if(ancho_ventana < 450)
		{
			$("nav").show();
			$("#btn_menu").show();
			$("#navegacion").hide();
			//alert(ancho_ventana);
		}else{
			$("#btn_menu").hide();
			$("#navegacion").show();
		}
	});

	$(window).scroll(function(){
		//alert("todo ok"+$(window).scrollTop()+"---"+$(window).height());
		if($(window).scrollTop() > (300))
		{
			//alert("jajaja");
			$("#btn_subir").show();
			if(ancho_ventana>450)
				$("nav").fadeOut();
		}else
		{
			$("#btn_subir").hide();
			if(ancho_ventana>450)
				$("nav").fadeIn();
		}
	});


