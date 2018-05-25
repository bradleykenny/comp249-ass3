(function(){

    /* your code goes here */

    $(document).ready(function(){
        // $("#content").text("This text was placed here by the javascript in static/js/script.js")

		$.getJSON('/positions', function(data) {
			console.log(data);
			for (var i = 0; i < 10; i++) {
				// creates and adds to a string that outputs html into the cards
				var output = "<div class='card'>"
				output += "<div class='jobtitle'>" + data[i].title + "</div>";
				output += "<div class='company'><img src='static/img/company.png/'>" + data[i].company + "</div>";
				output += "<div class='location'><img src='static/img/location.png/'>" + data[i].location + "</div>";
				output += "<div class='time'><img src='static/img/time.png/'>" + data[i].created_at + "</div>";
				// output += "<hr><div class='description'>" + data[i].description + "</div>";
				output += "<a class='button'>Read More</a>"
				output += "</div>";
				$("#preview_cards").append(output);
			}
			var output = "<div class='card'>"
			output += "<div class='jobtitle'>" + data[0].title + "</div>";
			output += "<div class='company'><img src='static/img/company.png/'>" + data[0].company + "</div>";
			output += "<div class='location'><img src='static/img/location.png/'>" + data[0].location + "</div>";
			output += "<div class='time'><img src='static/img/time.png/'>" + data[0].created_at + "</div>";
			output += "<hr><div class='description'>" + data[0].description + "</div>";
			output += "<a class='button'>Read More</a>"
			output += "</div>";
			$("#content").append(output);
    	});
    })
})()
