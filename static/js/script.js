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

function mainCardContent(val) {
	$.getJSON('/positions', function(data) {
		$("#contentCard").show();

		var template = Handlebars.compile($("#main_card_template").html());
		var output = template(data[val]);

		$("#contentCard").html(output);

		$(".closeBox").click(function() {
			$("#contentCard").hide();
		})

		$(".applyBtn").click(function() {
			$("#applyCard").show();
			var job_id = data[val].id;
			var job_title = data[val].title;
			$('input[name$=job_title]').val(job_title);
			$('input[name$=position_id]').val(job_id);
			window.scrollTo(0,0);
		})

		$(".closeBoxApply").click(function() {
			$("#applyCard").hide();
		})
	})
}

function renderCardByID(id_val) {
	$.getJSON('/positions', function(data) {
		var ref = 0;
		console.log(id_val);
		console.log(data[0].id);
		for (var i = 0; i < data.length; i++) {
			if (data[i].id === id_val) {
				ref = i;
				console.log("HERE");
				break;
			}
		}
		$("#contentCard").show();

		var template = Handlebars.compile($("#main_card_template").html());
		var output = template(data[ref]);

		$("#contentCard").html(output);

		$(".closeBox").click(function() {
			$("#contentCard").hide();
		})

		$(".applyBtn").click(function() {
			$("#applyCard").show();
			var job_id = data[ref].id;
			var job_title = data[ref].title;
			$('input[name$=job_title]').val(job_title);
			$('input[name$=position_id]').val(job_id);
			window.scrollTo(0,0);
		})

		$(".closeBoxApply").click(function() {
			$("#applyCard").hide();
		})
	})
}

function applyCardContent(val) {
	var output = "<div class='card' id='contentCard'>";
	output += "<input type='text'/>";
	output += "</div>";
}





// creates and adds to a string that outputs html into the cards
// var output = "<div class='card' id='" + i + "'>"
// output += "<div class='jobtitle'>" + data[i].title + "</div>";
// output += "<div class='company'><img src='static/img/company.png/'>" + data[i].company + "</div>";
// output += "<div class='location'><img src='static/img/location.png/'>" + data[i].location + "</div>";
// output += "<div class='time'><img src='static/img/time.png/'>" + data[i].created_at + "</div>";
// // output += "<a class='buttonBottomSubmerged'>Read More</a>"
// output += "</div>";
//
