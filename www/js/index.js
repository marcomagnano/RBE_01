Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },


    blog: function(){
        function getBlogs() {
        	$('#page-loader').fadeIn(600);
            var dfd = $.Deferred();
            $.ajax({
                url: 'http://rbe.it/news/api/get_recent_posts/',
                type: 'GET',
                dataType: 'json',
                success: function(data){
                    var source   = $("#blog-template").html();
                    var template = Handlebars.compile(source);
                    var blogData = template(data);
                    $('#blog-data').html(blogData);
                    $('#blog-data').trigger('create');
                    dfd.resolve(data);

                },
                error: function(data){
                    console.log(data);
                }
            });
            return dfd.promise();
        };

        getBlogs().then(function(data){
        	$('#page-loader').fadeOut(600);
            $('#all-posts').on('click','li', function(e){                
                localStorage.setItem('postData', JSON.stringify(data.posts[$(this).index()]));
            });
        });

        
    },
    
    VPblog: function(){
        function getVPBlogs() {
        	$('#page-loader').fadeIn(600);
            var dfd = $.Deferred();
            $.ajax({
                url: 'http://vociprotestanti.it/api/get_recent_posts/',
                type: 'GET',
                dataType: 'json',
                success: function(data){
                    var source   = $("#blog-template").html();
                    var template = Handlebars.compile(source);
                    var blogData = template(data);
                    $('#blog-data').html(blogData);
                    $('#blog-data').trigger('create');
                    dfd.resolve(data);

                },
                error: function(data){
                    console.log(data);
                }
            });
            return dfd.promise();
        };

        getVPBlogs().then(function(data){
        	$('#page-loader').fadeOut(600);
            $('#all-posts').on('click','li', function(e){                
                localStorage.setItem('postData', JSON.stringify(data.posts[$(this).index()]));
            });
        });

        
    },
    single: function() {
        
            var postDataStorage = localStorage.getItem('postData');
            var source   = $("#single-template").html();
            var template = Handlebars.compile(source);
            var postData = template(JSON.parse(postDataStorage));    
            $('#single-data').html(postData);

    },
    VPsingle: function() {
        
            var postDataStorage = localStorage.getItem('postData');
            var source   = $("#single-template").html();
            var template = Handlebars.compile(source);
            var postData = template(JSON.parse(postDataStorage));    
            $('#single-data').html(postData);

    }

};