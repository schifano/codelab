var express = require('express'),
    app     = express(),
    port    = 3000;
    
app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});

app.listen(port, function() {
  console.log('Listening on port %d. Use Ctrl+C to stop.', port);
});
