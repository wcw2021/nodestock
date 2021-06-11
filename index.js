const express = require('express')
const path = require('path')
const exphbs  = require('express-handlebars');

const app = express()

const PORT = process.env.PORT || 5000;

//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "this is other stuff";

//set handlebars routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: "this is stuff...",
        other: otherstuff
    });
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, ()=> console.log('server listening on port '+PORT));

