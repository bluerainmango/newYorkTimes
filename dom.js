var userInput = {
    searchTerm: null,
    num: null,
    startYear: null,
    endYear: null    
}

// Data from backend will be saved here. 
var serverData = {
    title: "this is title",
    author: "this is author"
}

$('#searchBtn').on('click',function(e){
    e.preventDefault();
    // Get inputs
    userInput.searchTerm = $('#searchTerm').val();
    userInput.num = $('#num').val();
    userInput.startYear = $('#startYear').val();
    userInput.endYear = $('#endYear').val();
    $('input').val("");
    
    // Render
    renderArticles();
});

$('#clearBtn').on('click',function(e){
    e.preventDefault();
    $('#articles-go-here').empty();
});

function renderArticles(){
    // index, title, by author data
    var index = 1;
    var title = $('<div>').append(serverData.title).attr('data-index',serverData.title);
    var author = $('<div>').text('by');
    $('<span>').append(serverData.author).attr('data-name',serverData.author);
    // $('articles-go-here').
};

console.log(userInput);