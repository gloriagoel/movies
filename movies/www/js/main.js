function init(){
   
	//navigator.splashscreen.hide();
	
    getMoviesListAndDrawList();
	
	//BD
	db = window.sqlitePlugin.openDatabase({name: 'favouriteslist.db', location: 'default'});
   
   
   db.sqlBatch([
   'CREATE TABLE IF NOT EXISTS favouriteslist (original_title, id)'/*,
   [ 'INSERT INTO favouriteslist VALUES (?,?)', ['It', '346364'] ],
   [ 'INSERT INTO favouriteslist VALUES (?,?)', ['Jumanji', '8844'] ]*/
   ], function() {
	   console.log('Populated database OK');
	   alert("Table created successfully");
   }, function(error) {
	   console.log('SQL batch ERROR: ' + error.message);
	   alert("Error occurred while creating the table.");
   }); 
   
   
    
/*
	document.getElementById("submit").addEventListener("click", newfav, false);
	db = window.sqlitePlugin.openDatabase({ name: 'schedule.db', location: 'default' }, function (db) {

	    db.transaction(function (tx) {
	    
	    tx.executeSql('CREATE TABLE appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, original_title TEXT, id TEXT)');
		}, function (error) {
		    alert('transaction error: ' + error.message);
		}, function () {
		    alert('transaction ok');
		});

	}, function (error) {
		 alert('Open database ERROR: ' + JSON.stringify(error));
	});	*/
	
	//END BD
	
	document.getElementById("submit").onclick = insertDb;
	//db.transaction(insertDb);
}


function insertDb(db){
	alert("Function works ok");
    db.sqlBatch([
   [ 'INSERT INTO favouriteslist (original_title,id) VALUES ["It", "346364"]' ]
    ], function(){
		alert('Inserted in the DB');
        console.log('insert ok');
    }, function(error){
		alert('Not inserted');
        console.log('insert ERROR: '+ error.message);
    });
}


/*
function delteDb(){
    db.sqlBatch([
        'delete FROM favouriteslist'
    ], function(){
        console.log('delete OK');
    }, function(error) {
        console.log('delete ERROR '+ error.message);
    });
}
*/

function getMovieAndDrawDetail(id){
     var request = $.ajax({
         url: "https://api.themoviedb.org/3/movie/"+id+"?api_key=4da6b895870b2ff644982b6a5b10f5d8",
          method: "GET"
        });

        request.done(function( result ) {
            $.mobile.navigate( "#page2" );
            var listdetails = $("#mylistdetails");
            listdetails.empty();
            listdetails.append("<h2>"+result.original_title+"</h2><br>");
            listdetails.append("<img src=https://image.tmdb.org/t/p/w500"+result.poster_path+" height='300px'>");
            listdetails.append("<h3>Note: "+result.vote_average+"</h3>");
            listdetails.append("<p>Release date: "+result.release_date+"</p>");
            listdetails.append("<p>"+result.overview+"</p>");
            
            return result;
           
            listdetails.listview("refresh");
        });
    
        request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
    });
    
    
}

function getMoviesListAndDrawList(){
    var theList = $("#mylist");
    
     var request = $.ajax({
          url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4da6b895870b2ff644982b6a5b10f5d8",
          method: "GET"
        });

        request.done(function( moviesList ) {
            
            
            for (i=0;i<moviesList.results.length;i++){
                // theList.append( "<li>" + moviesList.results[i].original_title + "</li>");
                theList.append("<div class='ui-block-a'><br><img src=https://image.tmdb.org/t/p/w500"+moviesList.results[i].poster_path+" height='280'></div>");
				theList.append("<div class='ui-block-b'><br><li><a href=javascript:getMovieAndDrawDetail("+moviesList.results[i].id +")>"+moviesList.results[i].original_title+"</a></li></div><br>");
				  
                }
            
            theList.listview("refresh");
            
            });

        request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
    });
}