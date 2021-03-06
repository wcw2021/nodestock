// stock market portfolio app

const express = require('express')
const path = require('path')
const exphbs  = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const app = express()

const PORT = process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//api pk_bcd8e16313124483844f162ad341fba7
function call_api(finishedApi, ticker){
  request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_bcd8e16313124483844f162ad341fba7', {json: true}, (err, res, body) => {
      if(err) {return console.log(err);};
      if(res.statusCode === 200) {
          // console.log(body)
          finishedApi(body);
        };
  });
    
}



//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "this is other stuff";

//set handlebars index GET route
app.get('/', function (req, res) {
    call_api(function(doneApi){
                res.render('home', {
                stuff: "this is stuff...",
                other: otherstuff,
                stock: doneApi
                });
            },"fb");
    
});

//set handlebars index POST route
app.post('/', function (req, res) {
    call_api(function(doneApi){
                // posted_stuff = req.body.stock_ticker;
                res.render('home', {
                stock: doneApi,
                // posted_stuff: posted_stuff
                });
            }, req.body.stock_ticker);
    
});


//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, ()=> console.log('server listening on port '+PORT));

