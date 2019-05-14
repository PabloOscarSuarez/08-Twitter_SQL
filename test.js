const client = require("./db")
client.query('SELECT * FROM tweets', function (err, result) {
    if (err) return next(err); // pasa el error a Express
    var tweets = result.rows;
    console.log(tweets)
    
    //res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });