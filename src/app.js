'use strict';

var express = require('express'),
      posts = require('./mock/posts.json');

var postLists = Object.keys(posts).map(function(key) {
  return posts[key];
});

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res) {
  var path = req.path;
  res.locals.path = path;
  res.render('index');
});

app.get('/blog/:title?', function(req, res) {
  var title = req.params.title;
  if (title === undefined) {
      res.status(503);
      res.render('blog', {posts: postLists});
  } else {
      var post = posts[title] || {} ;
      res.render('post', {post: post});
  }
});

app.get('/posts', function(req, res) {
  if (req.query.raw) {
      res.json(posts);
  } else {
      res.json(postLists);
  }
});

app.listen(3000, function() {
  console.log("The frontend server is running on port 3000!");
});