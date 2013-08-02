$(document).ready(function(){
	setContent();
});

//$('#reposHome').bind('pageinit', function(event) {
//	setContent();
//});

function loadRepos() {
    $.ajax("https://api.github.com/legacy/repos/search/javascript").done(function(data) {
        var i, repo;
        $.each(data.repositories, function (i, repo) {
            $("#allRepos").append("<li><a href='https://github.com/" + repo.username + "/" + repo.name + "'>"
            + "<h4>" + repo.name + "</h4>"
            + "<p>" + repo.username + "</p></a></li>");
        });
        $('#allRepos').listview('refresh');
    });
}

function setContent() {
	$("#allRepos").append("<li><h2>test</h2></li>");
}