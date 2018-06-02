(function(){

    $(document).ready(function() {
        // $("#content").text("This text was placed here by the javascript in static/js/script.js")
		$.getJSON('/positions', function(data) {
			console.log(data);
			var template = Handlebars.compile($("#preview_card_template").html());
			for (var i = 0; i < 10; i++) {

				var output = template(data[i]);
				$("#preview_cards").append(output);

				$("#preview_cards .card").click(function() {
					renderCardByID($(this).attr('id'), false);
					$("#content").css({position: "absolute", top:event.pageY, 'margin-left': 600+'px', 'margin-top': '-'+200+'px', 'z-index':1});
					$("nav").css({'z-index': 2})
				})
			}
			$("#searchResults").hide();
			mainCardContent(0);
			searchFunction();
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

		jobInformationCardCommon(data, val, true);
	})
}

// use this function when trying to load the job information card with the job_id
function renderCardByID(id_val, scroll) {
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

		jobInformationCardCommon(data, val, scroll);
	})
}

function jobInformationCardCommon(data, val, scroll) {
	// closes the job information box on the right when clicking on the cross
	$(".closeBox").click(function() {
		$("#contentCard").hide();
	})
	$("#applyCard").hide();
	$("#successBox").hide();
	$("#successBox img").click(function() {
		$("#successBox").hide();
	})

	// displays the "Apply" form when clicking on an "Apply" button
	$(".applyBtn").click(function() {
		$("#applyCard").show();
		var job_id = data[val].id;
		var job_title = data[val].title;
		$('input[name$=job_title]').val(job_title);
		$('input[name$=position_id]').val(job_id);
		doWeScroll(scroll);
	})

	// closes the "Apply" form when clicking the cross inside the form
	$(".closeBoxApply").click(function() {
		$("#applyCard").hide();
	})

	$("#applyForm").submit(function(e) {
		e.preventDefault();
		$.ajax({
			url:'/apply',
			type:'post',
			data:$('#applyForm').serialize(),
			success:function(response){
				$("#successBox").show();
				$("#successBox p").text(response.message);
			}
		});
	})
}

function searchFunction() {
	$("#searchBar").keyup(function(e){
		var q = $("#searchBar").val().split(" ");
		$.getJSON("/positions",
		{
			srsearch: q,
			action: "query",
			list: "search",
			format: "json"
		},
		function(data) {
			$("#content").css({position: "static", top:'', 'margin-left': 100+'px', 'margin-top': +0+'px', 'z-index':1 });
			$("#searchResults").empty();
			var resultsString = "<p>Results for ";
			for (var i = 0; i < q.length; i++) {
				if (i == 0){
					resultsString += "<b>" + q[i] + "</b>";
				} else if (i == q.length-1) {
					resultsString += " and <b>" + q[i] + "</b>";
				} else {
					resultsString += ", <b>" + q[i] + "</b>";
				}
			}
			$("#searchResults").append("<h1>Search Results</h1>" + resultsString + "</p>");
			for (var j = 0; j < q.length; j++) {
				var regex = new RegExp(q[j], "i");
				$.each(data, function(i, item){
					if ($("#searchBar").val().length == 0) {
						$("#searchResults").hide();
						$("#preview_cards").show();
						$("#content").css({position: "static", top:'', 'margin-left': 100+'px', 'margin-top': +0+'px', 'z-index':1 });
					}
					else if (q != null && data[i].title.search(regex) != -1) {
						$("#preview_cards").hide();
						$("#searchResults").show();
						$("#applyCard").hide();
						var template = Handlebars.compile($("#search_results_template").html());
						var output = template(item);

						$("#searchResults").append(output);

						$("#searchResults .card").click(function() {
							renderCardByID($(this).attr('id'), false);
							$("#content").css({position: "absolute", top:event.pageY, 'margin-left': 600+'px', 'margin-top': '-'+200+'px', 'z-index':1 });
							$("nav").css({'z-index': 2})
						})
					}
				});
			}
		});
  });
}

function doWeScroll(yesNo) {
	if (yesNo == true) {
		window.scrollTo(0,0);
	}
}

function subForm(e){
	e.preventDefault();
	$.ajax({
		url:'/apply',
		type:'post',
		data:$('#applyForm').serialize(),
		success:function(){
			alert("worked");
		}
	});
}


// ===== HANDLEBARS HELPER FUNCTIONS =====

Handlebars.registerHelper('splitURL', function(url) {
	var split_url = url.split("//");
	return split_url[1];
});
