'use strict';
var express = require('express');
var router = express.Router();
var client= require('../db')
var tweetBank = require('../tweetBank');

module.exports = router;

// USANDO BASE DE DATO PA
function respondWithAllTweets(req, res, next){
  var allTweets = client.query('SELECT * FROM users, tweets', function(err,data){
    if (err) return next(err)
    var tweets = data.rows;
    res.render('index', {tweets, showForm : true})
  })
}

// aca basícamente tratamos a la root view y la tweets view como identica
router.get('/', respondWithAllTweets);
router.get('/tweets', respondWithAllTweets);

// página del usuario individual
router.get('/users/:username', function(req, res, next){
  var tweetsForName = client.query('SELECT * FROM tweets INNER JOIN users ON tweets.user_id = users.id WHERE users.name = $1 ORDER BY users.id', [req.params.username], function(err,data){
    if (err) return next(err)
    var tweets = data.rows; 
    res.render('index', {tweets})
  })
  });

// página del tweet individual
router.get('/tweets/:id', function(req, res, next){
client.query('SELECT * FROM tweets WHERE tweets.id=$1',[req.params.id],function (err,data) {
    if (err) return next(err);
    var tweets=data.rows;
    res.render('index',{tweets})
  })
});
router.post('/tweets', function(req, res, next){
    console.log(req.body)
  client.query('SELECT id FROM users WHERE users.name=$1', [req.body.name], function(err,data){
      if (err) return next(err);
      var info = data.rows;
      console.log(data.rows)
      client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2)',[info[0].id, req.body.content], function(err, data){
        res.redirect('/')
      })


    })
})
// var newTweet = tweetBank.add(req.body.name, req.body.content);
// res.redirect('/');

// // reemplazá esta ruta hard-codeada con static routing general en app.js
// router.get('/stylesheets/style.css', function(req, res, next){
//   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
// });
