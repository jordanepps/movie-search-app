const express = require('express'),
  app = express(),
  request = require('request'),
  key = '&apikey=8fd7e988',
  preURL = 'http://www.omdbapi.com/?ype=movie&s=';

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static((__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('search');
});

app.get('/results', (req, res) => {
  var query = req.query.search,
    url = preURL + query + key;
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render('results', {
        data: data,
        query: query
      });
    }
  });
});

app.get('/movie', (req, res) => {
  var query = req.query.search,
    url = 'http://www.omdbapi.com/?i=' + query + key + '&plot=full';
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render('movie', {
        data: data
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
