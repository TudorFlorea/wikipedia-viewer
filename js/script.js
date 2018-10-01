$(document).ready(function () {
	
	
	$("#inp").val("asd");
    
    $("#search-box").css('visibility', 'hidden');
    
    $("#search").hover(function() {
        $("#search").addClass("buttons-hover");
        console.log("a");
    }, function() {
         $("#search").removeClass("buttons-hover");
    });
    
    $("#random").hover(function() {
        $(this).addClass("buttons-hover");
    }, function() {
         $(this).removeClass("buttons-hover");
    });

    $("content-wrapper").on("mouseenter",".link",function(){
        console.log("z");
        $(this).css("color", "red");
    });

    $(".content-wrapper").on("hover", ".offset", function() {
        console.log("f");
    });

    $("body").on({
        mouseenter: function () {
            $(".link").css("color", "red");
    },
        mouseleave: function () {
            $(".link").css("color", "blue");
    }
}, '.link');

    console.log(document);

    $("#search-form").on("submit", function(e) {
        e.preventDefault();
        ajaxRequest();
        $("#user-input").val("");
    });

    $("#search").on('click', function() {
        $("#user-input").switchClass('user-input-hidden', 'user-input-shown', 1000, "easeInOutQuad");
    });
    
    function ajaxRequest() {
        $.ajax({
			url: 'https://en.wikipedia.org/w/api.php',
			dataType: 'jsonp',
			jsonp: 'callback',
			data: {
				action: 'opensearch',
				search: getInput(),
				limit: 10,
				format: 'json'
			},
			success: function(data, status) {
				console.log(status);
				//console.log(data);
				$('#content-wrapper').empty();
				rednderResults(data);
			}
        });
        $("#user-input").val("");
    } 

	$("#search").on('click', ajaxRequest);

    


});

function getInput() {
	var input = $("#user-input").val();
    console.log(input);
	return input;
}

function rednderResults(results) {
    console.log(results);
    if(results[1][0] !== undefined) {
        $("#content-wrapper").html(makeResponseHtml(results));
    } else {
         $("#content-wrapper").html(makeErrorResponse()); 
        
    }
    
    console.log(results);
}

function test() {
	console.log(makeRequestLink(getInput()));
}

function makeResponseHtml(data) {
    var html = "";
    
    for(var i = 0; i < data[1].length; i++) {
        html += '<div class="row offset">';
        html +=     '<div class="col-md-3"></div>';
        html +=     '<div class="col-md-6">';
        html +=         '<a href="' + data[3][i] + '" target="_blank" class="link">';
        html +=             '<div class="content-row">';
        html +=                 '<h2>' + data[1][i] + '</h2>';
        html +=                 '<p>' + data[2][i] + '</p>';
        html +=             '</div>';
        html +=         '</a>';
        html +=     '</div>';
        html +=     '<div class="col-md-3"></div>';
        html += '</div>';
    }
    return html;
}


function makeErrorResponse() {
    var html = "";
    
        html += '<div class="row offset">';
        html +=     '<div class="col-md-3"></div>';
        html +=     '<div class="col-md-6">';
        html +=             '<div class="content-row text-center">';
        html +=                 '<h2>Invalid search request!</h2>';
        html +=             '</div>';
        html +=     '</div>';
        html +=     '<div class="col-md-3"></div>';
        html += '</div>';
    return html;
}


