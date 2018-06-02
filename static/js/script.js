(function(){

    $(document).ready(function() {
		$.getJSON('/positions', function(data) {
			// console.log(data);
			var template = Handlebars.compile($("#preview_card_template").html());
			for (var i = 0; i < 10; i++) {
				var output = template(data[i]);
				$("#preview_cards").append(output);
			}
			$("#preview_cards .card").click(function() {
				renderCardByID($(this).attr('id'), false);
				$("#content").css({position: "absolute", top:event.pageY, 'margin-left': 600+'px', 'margin-top': '-'+200+'px', 'z-index':1});
				$("nav").css({'z-index': 2})
			})
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

	// used to not redirect to '/apply' and instead show the response on the page
	// .submit() submitted the form multiple times? unbinding+binding seems to fix
	$("#applyForm").unbind('submit').bind('submit',function(e) {
		e.preventDefault();
		$.ajax({
			url:'/apply',
			type:'post',
			data:$('#applyForm').serialize(),
			success:function(response){
				$("#successBox").show();
				$("#successBox p").html('<b>[' + response.count + ']</b> ' + response.message + ".");
			}
		});
	})
}

function searchFunction() {
	$("#searchBar").keyup(function(e){
		// splits the query up by spaces into an array of search terms
		var search_terms = $("#searchBar").val().split(" ");
		$.getJSON("/positions",
		{
			srsearch: search_terms,
			action: "query",
			list: "search",
			format: "json"
		},
		function(data) {
			$("#content").css({position: "static", top:'', 'margin-left': 100+'px', 'margin-top': +0+'px', 'z-index':1 });
			$("#searchResults").empty();

			// shows what terms are being searched for
			var resultsString = "<p>Results for ";
			for (var i = 0; i < search_terms.length; i++) {
				if (i == 0){
					resultsString += "<b>" + search_terms[i] + "</b>";
				} else if (i == search_terms.length-1) {
					resultsString += " and <b>" + search_terms[i] + "</b>";
				} else {
					resultsString += ", <b>" + search_terms[i] + "</b>";
				}
			}

			$("#searchResults").append("<h1>Search Results</h1>" + resultsString + "</p>");
			for (var j = 0; j < search_terms.length; j++) {
				var regex = new RegExp(search_terms[j], "i");
				$.each(data, function(i, item){
					// hide search functionality if there is no text in the search bar
					if ($("#searchBar").val().length == 0) {
						$("#searchResults").hide();
						$("#preview_cards").show();
						// puts job information pane back in its default position
						$("#content").css({position: "static", top:'', 'margin-left': 100+'px', 'margin-top': +0+'px', 'z-index':1 });
					}
					// when search terms are in the box...
					else if (search_terms != null && data[i].title.search(regex) != -1) {
						$("#preview_cards").hide();
						$("#searchResults").show();
						$("#applyCard").hide();
						var template = Handlebars.compile($("#preview_card_template").html());
						var output = template(item);

						$("#searchResults").append(output);
					}
				});
			}

			// enables information pane to appear next to clicked card
			$("#searchResults .card").click(function() {
				renderCardByID($(this).attr('id'), false);
				$("#content").css({position: "absolute", top:event.pageY, 'margin-left': 600+'px', 'margin-top': '-'+200+'px', 'z-index':1 });
				$("nav").css({'z-index': 2})
			})
		});
  });
}

// a function that we use to manipulate whether
// clicking on the apply takes us to top of page
function doWeScroll(yesNo) {
	if (yesNo == true) {
		window.scrollTo(0,0);
	}
}


// ===== HANDLEBARS HELPER FUNCTIONS =====

Handlebars.registerHelper('splitURL', function(url) {
	var split_url = url.split("//");
	return split_url[1];
});
