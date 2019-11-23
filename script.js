$(document).ready(function(){

    //$("button").on("click", function() {
    var term = "search"
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+term+"&api-key=HJRPI3WAVBSgVQcgMkFIGBbV4htwJpHq"
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(data) {
        var listOfArticles= data.response.docs
        console.log (listOfArticles);
        for (var i = 0; i < listOfArticles.length; i++) {
        var articleTitle = listOfArticles[i].headline.main;
        var titleElement= $("<p>").html(articleTitle);
        $("body").append(titleElement);
        }
        
        })
        })
  //});
