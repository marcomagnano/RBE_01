$('#mainPage').bind('pageinit', function(event) {
	loadRbeRSS();
});

function loadRbeRSS() {
	$('#content').html('Connessione in corso...');
	$.ajax({
		type: 'GET',
        url: 'http://rbe.it/news/wp-rss2.php',
        success: function(data,stato) {
	          $('#content').html("Bene bene");
        },
        error: function(richiesta,stato,errori) {
	        $('#content').html("Male male: " + stato);
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