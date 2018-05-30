(function(){

    $(document).ready(function(){
        // $("#content").text("This text was placed here by the javascript in static/js/script.js")
		$.getJSON('/positions', function(data) {
			console.log(data);
			for (var i = 0; i < 10; i++) {
				// creates and adds to a string that outputs html into the cards
				var output = "<div class='card' id='" + i + "'>"
				output += "<div class='jobtitle'>" + data[i].title + "</div>";
				output += "<div class='company'><img src='static/img/company.png/'>" + data[i].company + "</div>";
				output += "<div class='location'><img src='static/img/location.png/'>" + data[i].location + "</div>";
				output += "<div class='time'><img src='static/img/time.png/'>" + data[i].created_at + "</div>";
				// output += "<hr><div class='description'>" + data[i].description + "</div>";
				output += "<a class='buttonBottomSubmerged'>Read More</a>"
				output += "</div>";
				$("#preview_cards").append(output);
				$(".jobtitle").click(function() {
					mainCardContent($(this).parent().attr('id'));
				})
				$(".buttonBottomSubmerged").click(function() {
					mainCardContent($(this).parent().attr('id'));
				})
			}
			mainCardContent(0);
    	});
	})
})()

function mainCardContent(val) {
	$.getJSON('/positions', function(data) {
		var output = "<div class='card' id='contentCard'>"
		output += "<div class='jobtitle'>" + data[val].title + "</div>";
		output += "<div class='closeBox'><img src='static/img/close_32.png' id='closeBoxImg'/></div>";
		output += "<div class='company'><img src='static/img/company.png/'>" + data[val].company + "</div>";
		output += "<div class='location'><img src='static/img/location.png/'>" + data[val].location + "</div>";
		output += "<div class='time'><img src='static/img/time.png/'>" + data[val].created_at + "</div>";
		output += "<hr><div class='description'>" + data[val].description + "</div>";
		output += "<a class='buttonBottomSubmerged' id='" + val + "'>Apply Now</a>"
		// output += "<a class='button'>Read More</a>"
		output += "</div>";
		$("#content").html(output);

		$(".closeBox").click(function() {
			$("#contentCard").hide()
		})
	})
}
