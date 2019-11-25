// User input data
var userInput = {
    term: null, // Search Term
    num: null, // Number of Records to Retrieve
    startYear: null,
    endYear: null    
}

// Data from backend will be saved here. 
var serverData = [];

$('#searchBtn').on('click',function(e){

    e.preventDefault();

    // Get inputs from DOM
    userInput.term = $('#term').val();
    userInput.num = $('#num').val();
    userInput.startYear = $('#startYear').val();
    userInput.endYear = $('#endYear').val();

    console.log(userInput);

    // Render
    // renderArticles();
});

function renderArticles(){
    
    $('#articles-go-here').empty();

    for( var i=0 ; i < userInput.num ; i++ ){

        // Render data to DOM
        var article =  `<div class="article">
                            <div class="index">${i+1}</div>
                            <div class="article__content">
                                <div class="title">
                                    <a href="${serverData[i].web_url}">${serverData[i].headline.main}
                                    </a>
                                </div>
                                <div class="author">
                                    <span class="authorName">${serverData[i].byline.original}</span>
                                </div>
                        </div>`

        $('#articles-go-here').append(article);  
    }
};

$('#clearBtn').on('click',function(e){
    e.preventDefault();
    $('#articles-go-here').empty();
});
