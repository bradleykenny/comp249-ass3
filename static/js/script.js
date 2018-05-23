(function(){

    /* your code goes here */

    $(document).ready(function(){
        // $("#content").text("This text was placed here by the javascript in static/js/script.js")

		$.getJSON('/positions', function(data) {
			console.log(data);
			for (var i = 0; i < 10; i++) {
				var output = "<div class='card'>"
				output += "<div class='jobtitle'>" + data[i].title + "</div>";
				output += "<div class='company'><img src='static/img/company.png/'>" + data[i].company + "</div>";
				output += "<div class='location'><img src='static/img/location.png/'>" + data[i].location + "</div>";
				output += "<div class='time'><img src='static/img/time.png/'>" + data[i].created_at + "</div>";
				output += "</div>"
				$("#content").append(output);
			}
    	});
    })
})()
