/*
 ********************************************
 *
 * JQTRANSFROM EKLENTI DUZENLEME / 01-01-2014
 * FERDI TARAKCI
 * WWW.FERDITARAKCI.COM
 * BILGI@FERDITARAKCI.COM
 *
 ********************************************
 *
 * E-Ticaret Teması - 16/05/2014
 * Front-End Web Developer : Ferdi Tarakci
 * www.ferditarakci.com
*/

/*
 ********************************************
 *
 * ORJINAL EKLENTI
 *
 ********************************************
 *
 * jqTransform
 * by mathieu vilaplana mvilaplana@dfc-e.com
 * Designer ghyslain armand garmand@dfc-e.com
 *
 *
 * Version 1.0 25.09.08
 * Version 1.1 06.08.09
 * Add event click on Checkbox and Radio
 * Auto calculate the size of a select element
 * Can now, disabled the elements
 * Correct bug in ff if click on select (overflow=hidden)
 * No need any more preloading !!
 * 
 * Edited By Konstantin Konstantinov
 * http://blog.konstantinkonstantinov.net/2011/04/jqtransform-plugin-select-change-event.html
 *
 ******************************************** */
 
(function( $ ) {

	/*
		// LABEL
	*/
	var jqTransformGetLabel = function( objfield ) {
		var selfForm = $(objfield.get(0).form);
		var oLabel = objfield.next();
		if(!oLabel.is("label")) {
			oLabel = objfield.prev();
			if(oLabel.is("label")) {
				var inputname = objfield.attr('id');
				if(inputname) {
					oLabel = selfForm.find("label[for=\""+ inputname + "\"]");
				}
			}
		}
		if (oLabel.is("label")) return oLabel;
		//if (oLabel.is('label')) return oLabel.css('cursor', 'pointer');
		return false;
	};

	/* Hide all open selects */
	var jqTransformHideSelect = function( oTarget ) {
		var ulVisible = $(".jqTransformSelectWrapper ul:visible");
		ulVisible.each(function() {
			var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);

			/* do not hide if click on the label object associated to the select */
			if (!(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0))) $(this).hide();
		});
	};

	/* Check for an external click */
	var jqTransformCheckExternalClick = function( event ) {
		if ($(event.target).parents(".jqTransformSelectWrapper").length === 0) {
			jqTransformHideSelect( $(event.target) )
		}
	};

	/* Apply document listener */
	var jqTransformAddDocumentListener = function () {
		$(document).mousedown( jqTransformCheckExternalClick );
	};	

	/*
		// FORM RESET
	*/
	$.fn.jqTransReset = function () {
		$(this).each(function() { 
			this.form.reset();

			/* Radio buttons */
			$(".jqTransformRadio").each(function() { 
				if ($(this).hasClass("jqTransformChecked")) 
					$(this).removeClass("jqTransformChecked");
			});

			/* Check boxes */
			$(".jqTransformCheckbox").each(function(){ 
				if ($(this).hasClass("jqTransformChecked")) 
					$(this).removeClass("jqTransformChecked");
			});

			/* Select field */
			$("div.jqTransformSelectWrapper").each(function() {
				$("div span", this).text($("ul li:first", this).text());
				$("ul li a.selected", this).removeClass("selected");
				$("ul li:first a", this).addClass("selected");
			});
		});
	};

	/*
		// CHECK BUTON
	*/
	$.fn.jqTransCheckBox = function() {
		return this.each(function() {

			if ($(this).hasClass("jqTransformHidden")) return;

			/*
				// ELEMENT KIMLIK
			*/
			var input = $(this);
			var inputSelf = this;
			var Form = $(this).closest("form");

			/*
				// ELEMENT SECIMI
			*/
			var changeInput = function() {
				input.change();
				return false;
			}

			/*
				// ELEMENT LABEL SECIMI
			*/
			oLabel = jqTransformGetLabel( input );

			var aLink = $("<a />", {
				//"href" : "#",
				"class" : "jqTransformCheckbox",
				"rel" : inputSelf.name
			});

			input
				.addClass("jqTransformHidden")
				.wrap("<span class=\"jqTransformCheckboxWrapper\"></span>")
				.parent()
				.prepend(aLink);

			/*
				// ELEMENT TIKLAMASI
			*/
			oLabel && oLabel.click( changeInput );
			aLink.click( changeInput );

			input.change(function() {
				if ($(this).prop("disabled")) return false;

				$(this).prop("checked", !$(this).prop("checked"));
				$(this).prop("checked") && aLink.addClass("jqTransformChecked") || aLink.removeClass("jqTransformChecked");
				$(this).prop("checked") && aLink.parent(".jqTransformCheckboxWrapper").addClass("jqCheckboxWrapperChecked") || aLink.parent(".jqTransformCheckboxWrapper").removeClass("jqCheckboxWrapperChecked");
				return true;
			});

			inputSelf.checked && aLink.addClass("jqTransformChecked");
			inputSelf.checked && aLink.parent(".jqTransformCheckboxWrapper").addClass("jqCheckboxWrapperChecked");
		});
	};

	/*
		// RADIO BUTON
	*/
	$.fn.jqTransRadio = function() {
		return this.each(function() {

			if ($(this).hasClass("jqTransformHidden")) return;

			/*
				// ELEMENT KIMLIK
			*/
			var input = $(this);
			var inputSelf = this;
			var Form = $(this).closest("form");

			/*
				// ELEMENT SECIMI
			*/
			var changeInput = function() {
				input.change();
				return false;
			}

			/*
				// ELEMENT LABEL SECIMI
			*/
			oLabel = jqTransformGetLabel( input );

			var aLink = $("<a />", {
				//"href" : "#",
				"class" : "jqTransformRadio",
				"rel" : inputSelf.name
			});

			input
				.addClass("jqTransformHidden")
				.wrap("<span class=\"jqTransformRadioWrapper\"></span>")
				.parent()
				.prepend(aLink);

			/*
				// ELEMENT TIKLAMASI
			*/
			oLabel && oLabel.click( changeInput );
			aLink.click( changeInput );

			input.change(function() {
				if ($(this).prop("disabled")) return false;
				
				var radioName = $("input[name=\"" + aLink.attr("name") + "\"]:radio", Form);
				var relName = $(".jqTransformRadio[rel=\"" + aLink.attr("rel") + "\"]", Form);

				radioName.removeProp("checked");
				$(this).prop("checked", true);

				relName.removeClass("jqTransformChecked")
				relName.parent(".jqTransformRadioWrapper").removeClass("jqRadioWrapperChecked")
				$(this).prev( relName ).addClass("jqTransformChecked");
				$(this).parent(".jqTransformRadioWrapper").addClass("jqRadioWrapperChecked");

				return true;
			});

			inputSelf.checked && aLink.addClass("jqTransformChecked");
			inputSelf.checked && aLink.parent(".jqTransformRadioWrapper").addClass("jqRadioWrapperChecked");
		});
	};

	/*
		// SELECT
	*/
	$.fn.jqTransSelect = function( isRefreshOptionList ) {
		return this.each(function( index ) {
			/*
				// ELEMENT KIMLIK
			*/
			var selectbox = $(this);
			var Form = $(this).closest("form");

			if (selectbox.hasClass("jqTransformHidden") && isRefreshOptionList !== "update") return;
			if (selectbox.attr("multiple")) return;

			/*
				// ELEMENT LABEL SECIMI
			*/
			oLabel = jqTransformGetLabel( selectbox );

			/*
				// SELECT UPDATE REFRESH
			*/
			if (typeof isRefreshOptionList != "undefined" && isRefreshOptionList === "update"){
				$parent = selectbox.parent();
				if ($parent.hasClass("jqTransformSelectWrapper")) {
					selectbox.parent().children().not( selectbox ).each(function (){
						$(this).remove();
					});
					selectbox.removeClass("jqTransformHidden").unwrap( selectbox.parent() );
				}
			}

			/* First thing we do is Wrap it */
			var selectWrap = selectbox
				.addClass("jqTransformHidden")
				.wrap("<div class=\"jqTransformSelectWrapper\"></div>")
				.parent()
				/*.css({"z-index" : 10 - index})*/
			;

			var SelectWrapperSize = $(".jqTransformSelectWrapper", Form).size();
			$(".jqTransformSelectWrapper", Form).each(function ( i ) {
				$(this).css({"z-index" : SelectWrapperSize - i});
			});

			/* Now add the html for the select */
			selectWrap.prepend("<div><span></span><a class=\"jqTransformSelectOpen\"></a></div><ul></ul>");

			var selectWidth = selectbox.innerWidth();

			var ul = $("ul", selectWrap).width( selectWidth ).hide();

			/* Now we add the options */
			var option = [];
			$("option", this).each(function(i) {
				option.push("<li><a data-index=\"" + i + "\">" + $(this).html() + "</a></li>");
			});
			ul.html( option.join("") );

			/* Add click handler to the a */
			$("a", ul).click(function() {
				$("a.selected", selectWrap).removeClass("selected");
				$(this).addClass("selected");

				/* Fire the onchange event */
				if (selectbox[0].selectedIndex != $(this).data("index")) {
					selectbox[0].selectedIndex = $(this).data("index");
					$(selectbox[0]).change();
				}

				selectbox[0].selectedIndex = $(this).data("index");
				$("span:eq(0)", selectWrap).html( $(this).html() );

				ul.hide();

				return false;
			});

			/* Set the default */
			$("li:eq(" + this.selectedIndex + ") a", ul).click();

			var selectOpen = function() {
				$("a.jqTransformSelectOpen", selectWrap).click();
			}

			$("span:first", selectWrap).click( selectOpen );
			oLabel && oLabel.click( selectOpen );

			this.oLabel = oLabel;

			/* Apply the click handler to the Open */
			var oLinkOpen = $("a.jqTransformSelectOpen", selectWrap).click(function() {

				/* Check if box is already open to still allow toggle, but close all other selects */
				if (ul.css("display") == "none") jqTransformHideSelect();
				if (selectbox.prop("disabled")) return false;

				ul.slideToggle("fast", function() {					
					var offSet = ($("a.selected", ul).offset().top - ul.offset().top);
					ul.animate({ scrollTop : offSet });
				});

				return false;
			});

			/* Set the new width */
			var oSpan = $("span:first", selectWrap);
			var newWidth = (selectWidth > oSpan.innerWidth()) ? selectWidth/* + oLinkOpen.outerWidth()*/ : selectWrap.outerWidth();
			selectWrap.width( newWidth ); //console.log(parseInt(selectWrap.innerWidth()))
			ul.width( newWidth );

			oSpan.width((parseInt(selectWrap.innerWidth()) - parseInt(oSpan.css("paddingRight")) - parseInt(oSpan.css("paddingLeft")))); /* console.log(parseInt(selectWrap.innerWidth())) */
			
			/*
				Calculate the height if necessary, less elements that the default height
				show the ul to calculate the block, if ul is not displayed li height value is 0
			*/
			ul.css({
				display : "block",
				visibility : "hidden"
			});

			/* +1 else bug ff */
			var ulHeight = $("li", ul).size() * $("li:first", ul).height();

			/* hidden else bug with ff */
			(ulHeight < ul.height()) && ul.height( ulHeight );

			ul.css({
				display : "none",
				visibility : "visible"
			});

		});
	};

	$.fn.jqTransform = function() {

		/* each form */
		 return this.each(function() {

			//var selfForm = $(this);
			//if (selfForm.hasClass("jqtransformdone") && durum != "refresh") return;

			$(this).addClass("jqtransformdone");

			$("input:checkbox", this).jqTransCheckBox();
			$("input:radio", this).jqTransRadio();
			$("input:reset", this).click( $.fn.jqTransReset );

			if ($("select", this).jqTransSelect().size() > 0)
				jqTransformAddDocumentListener();

		}); /* End Form each */

	};/* End the Plugin */

})(jQuery);