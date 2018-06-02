(function(){

    $(document).ready(function() {
        // $("#content").text("This text was placed here by the javascript in static/js/script.js")
		$.getJSON('/positions', function(data) {
			console.log(data);
			var template = Handlebars.compile($("#preview_card_template").html());
			for (var i = 0; i < 10; i++) {

				var output = template(data[i]);
				$("#preview_cards").append(output);

				// TODO: CHOOSE ONE METHOD
				$(".buttonBottomSubmerged, .jobtitle").click(function() {
					renderCardByID($(this).parent().attr('id'));
				})
				$("#preview_cards .card").click(function() {
					renderCardByID($(this).attr('id'));
				})
			}
			mainCardContent(0);
    	})
	})
})()

// use this function when trying to load the job information card using the array index
function mainCardContent(val) {
	$.getJSON('/positions', function(data) {
		$("#contentCard").show();

		var template = Handlebars.compile($("#main_card_template").html());
		var output = template(data[val]);

		$("#contentCard").html(output);

		jobInformationCardCommon(data, val);
	})
}

// use this function when trying to load the job information card with the job_id
function renderCardByID(id_val) {
	$.getJSON('/positions', function(data) {
		var val = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i].id === id_val) {
				val = i;
				break;
			}
		}
		$("#contentCard").show();

		var template = Handlebars.compile($("#main_card_template").html());
		var output = template(data[val]);

		$("#contentCard").html(output);

		jobInformationCardCommon(data, val);
	})
}

function jobInformationCardCommon(data, val) {
	// closes the job information box on the right when clicking on the cross
	$(".closeBox").click(function() {
		$("#contentCard").hide();
	})

	// displays the "Apply" form when clicking on an "Apply" button
	$(".applyBtn").click(function() {
		$("#applyCard").show();
		var job_id = data[val].id;
		var job_title = data[val].title;
		$('input[name$=job_title]').val(job_title);
		$('input[name$=position_id]').val(job_id);
		window.scrollTo(0,0);
	})

	// closes the "Apply" form when clicking the cross inside the form
	$(".closeBoxApply").click(function() {
		$("#applyCard").hide();
	})
}

Handlebars.registerHelper('splitURL', function(url) {
	var split_url = url.split("//");
	return split_url[1];
});
