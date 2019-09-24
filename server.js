let express = require('express'), // our framework
    parser = require('body-parser'), // parses body
    path = require('path'); // fixes file paths

let app = express();

app.use(parser.json())
    .use(parser.urlencoded({
        extended: true
    }));

app.use(express.static(path.join(__dirname, '/public/dist/public'))); //this always goes before the routes below

require('./server/config/database.js'); // connects database and loads models
require('./server/config/routes.js')(app); // runs the routes function, passes app to routes



app.listen(8003, function () {
    console.log("Running 8003 yadda yadda")
})