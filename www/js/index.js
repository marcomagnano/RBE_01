$('#mainPage').bind('pageinit', function(event) {
	loadRbeRSS();
});

function loadRbeRSS() {

	$.ajax({
		type: 'GET',
		dataType: 'xml',
        url: 'http://rbe.it/news/wp-rss2.php',
        success: function(data,stato) {
	        var rss = $(rss);
	          var html = '';
	          var items = rss.find('item');
	          var feedTitle = $('channel > title:first-child', rss).text();
	          var feedLink = $('channel > title:first-child + link', rss).text();
	          var feedDesc = $('channel > title:first-child + link + description', rss).text();
	          
	          html += '<h1><a href="' + feedLink + '">' + feedTitle + '</a></h1>';
	          html += '<div>' + feedDesc + '</div>';
	          html += '<ul>';
	          
	          items.each(function() {
	          
	            var item = $(this);
	            var desc = item.find('description').text();
	            var link = item.find('link').text();
	            var title = item.find('title').text();
	            
	            html += '<li><a href="' + link + '">' +
	                     title + '</a>' + 
	                     '<p>' + desc + '</p></li>';
	          
	          
	          });
	          
	          html += '</ul>';
	          
	          $('#content').html(html);
        },
        error: function(richiesta,stato,errori) {
	        $('#content').html("Male male");
        }
	});
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