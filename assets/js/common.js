
/*
 * E-Ticaret Teması - 16/05/2014
 * Front-End Web Developer : Ferdi Tarakci
 * www.ferditarakci.com
*/

jQuery(function( $ ) {

	$(".logo").disableSelection();
	$("input:checkbox").closest("th, td").disableSelection();
	$(".adet span").disableSelection();


	$("#ust").on("click", ".header-sepet .sepet-buton a", function(e) {
		$("#ust .header-sepet .sepet-listesi").slideToggle();
		return false;
	});


	$("#ust").on("click", ".tum-kategoriler > div > a", function(e) {
		$(this).toggleClass("current");
		$("#ust .tum-kategoriler > ul").slideToggle();
		return false;
	});


	$("form.jqTrans").jqTransform();
	$(".jqTransformSelectWrapper").disableSelection();


	/*
		// ANA SAYFA SLAYT
	*/
	var hs = "#slayt";

	if ($(".slide img", hs).size() > 1) {
		$(".slide", hs).superslides({
			play: 5000,
			pagination: true,
			animation: "fade",
			animation_easing: "easeInOutQuad",
			inherit_width_from: hs + " .slide",
			inherit_height_from: hs + " .slide"
		});
	}


	/*
		// URUN DETAY SLAYT
	*/
	var us = "#urun-galeri";

	if ($(".slayt img", us).size() > 1) {
		$(".slayt", us).superslides({
			play: 5000,
			pagination: true,
			animation: "fade",
			animation_easing: "easeInOutQuad",
			inherit_width_from: us + " .slayt",
			inherit_height_from: us + " .slayt"
		});

		$(".slayt-wrap", us).prepend("<div class=\"next-bg buton\"><a class=\"next\"></a></div>");
		$(".slayt-wrap", us).prepend("<div class=\"prev-bg buton\"><a class=\"prev\"></a></div>");

		$(".buton", us).on("click", ".prev, .next", function() {
			if ($(this).hasClass("next")) $(".slides-navigation").find(".next").click();
			if ($(this).hasClass("prev")) $(".slides-navigation").find(".prev").click();
			return false;
		}).disableSelection();

		$(".kucuk-resim", us).on("click", "> a", function() {
			$("#urun-galeri .slides-pagination a").eq( $(this).index() ).click();
			return false;
		}).disableSelection();

		omegaClass(".kucuk-resim > a", 6);

	}


	/*
		// CAROUSEL
	*/
	var cs = ".carousel";

	$(cs).each(function( i ) {
		var el = this;

		if ($("> ul > li", el).size() > 0) {

			$("> ul", el).wrap("<div class=\"cs\" />");
			$("> .cs", el).wrap("<div class=\"cs_bg\" />");

			$(el).prepend("<a class=\"next\"></a>");
			$(el).prepend("<a class=\"prev\"></a>");

			var $easing = $(el).data("easing");
			var $visible = $(el).data("visible");
			var $timeout = $(el).data("timeout");
			var $speed = $(el).data("speed");
			var $minuspx = $(el).data("minuspx");

			$(".cs", el).jCarouselLite({
				easing: $easing,
				swipe: false,
				auto: true,
				pause: true,
				visible: $visible,
				timeout: $timeout,
				speed: $speed,
				btnPrev: $("a.prev", el),
				btnNext: $("a.next", el)
			}).css("width", "-=" + $minuspx + "px");
			
			
		}
	});


	$("#toggle").change(function() {
		$("input[name=\"urunid\"]").toggleChecked( !$( this ).prop("checked") );
	});


	$(document).on("change", "input[name=\"urunid\"]", function() {
		$("#sepetten-sil > b").html( $("input[name=\"urunid\"]:checked").size() );
	});


	$(".sepetim").on("click", ".adet .arti, .adet .eksi", function() {
		var input = $(this).parent().find("input");
		var val = eval(input.val()); val = ($(this).hasClass("arti") ? (val + 1) : (val - 1));
		input.val( ((val < 1) ? 1 : val) );
	});


	$("#sepetten-sil").click(function() {
		var secilen = $(this).parents("form").find("input[name=\"urunid\"]:checked");
		var val = secilen.serialize();

		secilen.each(function() {
			$(this).parents("tr").remove();
		});

		$("#sepetten-sil > b").html( 0 );
		return false;
	});


	$("ul.urunler[data-tabid]").each(function() {
		omegaClass($("> li", this), 4);
	});

	omegaClass(".kategori ul.urunler > li", 4);

	$("nav.urun-filtrele").on("click", "> a", function() {
		$(this).addClass("current").siblings().removeClass("current");
		$("ul[data-tabid=\"" + $(this).attr("href") + "\"]").addClass("current").siblings().removeClass("current");
		return false;
	});


	$("#tabs").on("click", ".menu > a", function() {
		$(this).addClass("current").siblings().removeClass("current");
		$( $(this).attr("href") ).addClass("current").siblings().removeClass("current");
		return false;
	});


	if ($("a.urun-resim").size()) {
		$("a.urun-resim").attr({"rel" : "media-gallery"}).fancybox({ arrows : true, type : "image" });
	}

}); /* jQuery Ready */












/*
	// LİSTE SONU SINIFI EKLEME
*/
function omegaClass(secici, sayi) {
	secici = (typeof (secici[1]) == "string") ? $( secici ) : secici;
	if (secici.size() == 0) return false;
	secici.removeClass("omega");
	secici.filter(
		function( position ) {
			if ( (position + 1) % (sayi ? sayi : 4) == 0 && position != 0 ) $(this).addClass("omega")
		}
	)
}








(function( $ ) {

	$.fn.disableSelection = function() {
		return this
			.attr("unselectable", "on")
			.css("user-select", "none")
			.on("selectstart", false);
	};

	$.fn.toggleChecked = function( d ) { 
		$( this ).each(function() { console.log(d);
			$( this ).prop("checked", d).attr("checked", d);
			if (d) {
				$( this ).prev("a.jqTransformChecked").click();
			}
			else {
				$( this ).prev("a").click();
			}
		});
	};

	$.fn.yuseklikEsitle = function() {
		var maxLiHeight = Math.max.apply(null, this.map(function () {
			return $(this).height();
		}).get());
		return this.height( maxLiHeight );
	};

})(jQuery);





/*
 * E-Ticaret Teması - 16/05/2014
 * Front-End Web Developer : Ferdi Tarakci
 * www.ferditarakci.com
*/