let fs = require('fs');
let path = require('path');
let mongoose = require('mongoose');

// connect to mongodb, name of your scheme goes here
mongoose.connect("mongodb://localhost/beltExam", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// create a variable that points to the models folder
var models_path = path.join(__dirname, './../models');

// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        // require the file (this runs the model file which registers the schema)
        require(models_path + '/' + file);
    }
})