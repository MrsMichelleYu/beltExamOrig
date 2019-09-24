let pets = require('./../controllers/pets'); // controller require
let path = require('path');

module.exports = function (app) {
    app.get('/pets1/', pets.pets)
    app.get('/pets1/:id', pets.show)
    app.put('/pets/:id/like', pets.like)
    app.post('/pets1/', pets.create)
    app.put('/pets1/:id/edit', pets.update)
    app.delete('/pets/:id', pets.destroy)

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    }); //place this route at the end of all your routes 
};