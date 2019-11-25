$("document").ready(function(){

    // User input data storage
    var userInput = {
        term: null, // Search Term
        num: null, // Number of Records to Retrieve
        startYear: null,
        endYear: null    
    }
    
    // Server data storage
    var serverData = {
        articles:[],
        apiKey : "IhK2NlSFPIdwQGo1U2sVriGpkZ8FcBFs",
        page : 0,
        currentDate: function(){
            var currentDate = new Date();
    
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth()+1;
                month = month < 10 ? '0' + month : month;
            var day = currentDate.getDate();
                day = day < 10 ? '0' + day : day;
            
            return `${year}${month}${day}`;
        }
    }

    function getUserInput(){

        // Get inputs from DOM
        userInput.term = $('#term').val();
        userInput.num = $('#num').val();
        userInput.startYear = $('#startYear').val();
        userInput.endYear = $('#endYear').val();
        
    }
    function inputValidation(){

        // 1. If Search term or Number of records to retrieve is missing
        if(!(userInput.term && userInput.num)){
            
            alert("Please insert all the required fields : Search Term, Number of records to retrieve");
            throw new Error('🚧 Required inputs are missing!');

        }

        // 2. If option value is invalid
            // a. Start or End year is not 4 digits
        if( (userInput.startYear && userInput.startYear.length !== 4) 
            || (userInput.endYear && userInput.endYear.length !== 4) ){
 
            alert("Invalid input for Start Year or End Year! Please insert full year and ");
            throw new Error('🚧 Invalid input for Start Year or End Year.'); 

        }
            // b. Start year is after of End year
        if(userInput.startYear && userInput.endYear){
            if(Number(userInput.startYear) > Number(userInput.endYear)){
                alert("Start Year cannot be after End Year! Please make sure the Start Year is before or the same of the End Year.");
                throw new Error('🚧 The Start Year is after of the End Year.'); 
            }
        }

        if( Number(userInput.num) > 30 || Number(userInput.num) < 0 ){
            alert("Please insert the number of records to retrieve between 1 and 30. This is to prevent from too many request to server and we can get you the data stably.");
            throw new Error('🚧 Too high number to request.'); 
        }
        
        console.log('Getting user input....🦊', userInput)
    }
    function pagenation(num){

        // Decide how many pages should be requested to server(starting 0 to 100, 10 articles per page)
        serverData.page = ( num < 10 ) ? 0 : Math.floor(num / 10); 
   
    }
    function queryFactory(page){
                
        var query = `https://api.nytimes.com/svc/search/v2/articlesearch.json?page=${page}&q=${userInput.term}&fl=web_url,headline,byline&api-key=${serverData.apiKey}`;
  
        // If the option field has a value, validate it
        if(userInput.startYear || userInput.endYear){
            
            // If one of the option field is empty, set to default( Start date: 1900-01-01, End date: today )
            var beginDateQuery = userInput.startYear ? `&begin_date=${userInput.startYear+'0101'}` : `&begin_date=19000101`;
            var endDateQuery = userInput.endYear ? `&end_date=${userInput.endYear+'1231'}` : `&end_date=${serverData.currentDate()}`;
            
            query = query.concat(beginDateQuery, endDateQuery);
            
        }
        return query;
    }
    function getServerData(e){
        
        pagenation(userInput.num);
        
        serverData.articles = [];

        // Store server data to one array
        for( var i=0 ; i <= serverData.page; i++){
          
            var queryUrl = queryFactory(i);

            console.log('Getting data from server....🔋', 'queryUrl🔜: ', queryUrl)

            var ajax = $.ajax({
                            url: queryUrl,
                            method: "GET"
                        }).then(function(response){

                            console.log("Status: Success!🍓");
                            serverData.articles = serverData.articles.concat(response.response.docs);
                            
                        }).catch(function(err){

                            alert("❗️Sorry, Too many request or the unkown server error has occured. Try again with the less number of records to retrieve or try later.")
                            console.log('🚧 Error message: ',err);
                            throw new Error('Server Error');

                        })
        }

        // Render to DOM
        ajax.then(function(){ renderArticles() });

    }
    function renderArticles(){

        // Delete previous articles
        $('#articles-go-here').empty();

        // Render to DOM
        for( var i=0 ; i < userInput.num ; i++ ){

            var webUrl = serverData.articles[i].web_url;
            var title = serverData.articles[i].headline.main;
            var author = serverData.articles[i].byline.original;

            var article =  `<div class="article">
                                <div class="index">${i+1}</div>
                                <div class="article__content">
                                    <div class="title">
                                        <a href="${webUrl}">${title}</a>
                                    </div>
                                    <div class="author">
                                        <span class="authorName">${author}</span>
                                    </div>
                            </div>`

            $('#articles-go-here').append(article);  
        }
    };
    
    $('#searchBtn').click(function(e){

        e.preventDefault();
        getUserInput();
        inputValidation();
        getServerData();

    });

    $('#clearBtn').on('click',function(e){

        e.preventDefault();
        $('#articles-go-here').empty();

    });
})
