$( document ).on( "pageinit", "#streamingPage", function( event ) {
	playStream();
});

$( document ).on( "pageinit", "#mainRbePage", function( event ) {
	loadRbeRSS();
});

$( document ).on( "pageinit", "#contentPage", function( event ) {
	var $hash = window.location.hash,
		$pos = $hash.replace('#!', '');
	//$('#entryText').html("Questa è una pagina dettaglio: " + $hash);
	getRbeDetail($pos);
});

function playStream() {
  try {
    var myaudio = new Audio('http://stream15.top-ix.it/radiobeckwith.ogg');
    myaudio.id = 'playerMyAdio';
    myaudio.play();
  } catch (e) {
    alert('no audio support!');
  } 
}


function loadRbeRSS() {
	$('#content').html('Connessione in corso...');
	$.ajax({
	
		url: 'http://rbe.it/news/api/get_recent_posts/',
	    type: 'GET',
	    dataType: 'json',
	    success: function(data){
	      console.log(data);
	    },
	    error: function(data){
	      console.log(data);
	    }
	});
}

function getRbeDetail(pos) {
	$.ajax({
		type: 'GET',
        //url: 'http://rbe.it/news/wp-rss2.php',
        url: 'localfeed.xml',
        success: function(data,stato) {
	          $('#content').html("Bene anche il dettaglio");
	          
	          $(data).find('item:eq(' + pos + ')').each(function(){  
  
	            var $article = $(this);
	            var title = $article.find("title").text();
	            var description = $article.find('description').text();  
	            //var imageurl = $book.attr('imageurl');  
	  
	            //var html = '<dt> <img class="bookImage" alt="" src="' + imageurl + '" /> </dt>';  
	            var html = '<li>';
	            //html += '<dd> <span class="loadingPic" alt="Loading" />';  
	            html += '<h3 class="title">' + title + '</h3>';  
	            html += '<p> ' + description + '</p>' ;  
	            html += '</li>';  
	  
	            $('#entryText').html(html);
	            //$('.loadingPic').fadeOut(1400);  
	        });
	          
	          //console.log(data);
        },
        error: function(richiesta,stato,errori) {
	        $('#content').html("Male male: " + stato);
        }
	});
}

function loadRbeRSSDetail() {
	alert("This");
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//$(document).on('pageshow', '#reposDetail', function(event) {
//    var owner = getUrlVars().owner;
 //   var name = getUrlVars().name;
//    loadRepoDetail(owner,name);
//});

function loadRepoDetail(owner,name) {
     $.ajax("https://api.github.com/repos/" + owner + "/" + name).done(function(data) {
         var repo = data;
         console.log(data);

         $('#repoName').html("<a href='" + repo.homepage + "'>" + repo.name + "</a>");
         $('#description').text(repo.description);
         $('#forks').html("<strong>Forks:</strong> " + repo.forks + "<br><strong>Watchers:</strong> " + repo.watchers);

         $('#avatar').attr('src', repo.owner.avatar_url);
         $('#ownerName').html("<strong>Owner:</strong> <a href='" + repo.owner.url + "'>" + repo.owner.login + "</a>");
     });
}