// User input data
var userInput = {
    term: null, // Search Term
    num: null, // Number of Records to Retrieve
    startYear: null,
    endYear: null    
}

// Data from backend will be saved here. 
// format: [{ title: , author: }, { title: , author: }...]
// Inserted for example
var serverData = [
                    { title: "This is test title", author: "Emily"},
                    { title: "This is test title 2", author: "Tom"}
                ];

$('#searchBtn').on('click',function(e){

    e.preventDefault();

    // Get inputs from DOM
    userInput.term = $('#term').val();
    userInput.num = $('#num').val();
    userInput.startYear = $('#startYear').val();
    userInput.endYear = $('#endYear').val();

    console.log(userInput);

    // Render
    renderArticles();
});

function renderArticles(){
    
    for( var i=0 ; i < serverData.length ; i++ ){

        // Render data to DOM
        var article =  `<div class="article">
                            <div class="index">${i+1}</div>
                            <div class="article__content">
                                <div class="title">${serverData[i].title}</div>
                                <div class="author">by 
                                    <span class="authorName">${serverData[i].author}</span>
                                </div>
                        </div>`

        $('#articles-go-here').append(article);  
    }
};

$('#clearBtn').on('click',function(e){
    e.preventDefault();
    $('#articles-go-here').empty();
});
