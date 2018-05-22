(function(){

    /* your code goes here */

    $(document).ready(function(){
        // $("#content").text("This text was placed here by the javascript in static/js/script.js")

		$.getJSON('/positions', function(data) {
			console.log(data);
			for (var i = 0; i < 10; i++) {
				var output = "<div class='card'>"
				output += data[i].title;
				output += "<br>" + data[i].created_at;
				output += "</div>"
				$("#content").append(output);
			}
    	});
    })
})()
