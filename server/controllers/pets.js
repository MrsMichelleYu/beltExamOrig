let Pet = require('mongoose').model('Pet');
let errorHandler = require('./helpers/error-handler');

module.exports = {
    pets(req, res) {
        Pet.find().sort({
                type: 1
            })
            .then(data => {
                res.json(data)
            }) // all responses just spit json
            .catch(errorHandler.bind(res)); // .bind ensures this will refer to the response object and not the errorHandler function
    },
    show(req, res) {
        Pet.findById(req.params.id)
            .then(data => res.json(data))
            .catch(errorHandler.bind(res));
    },
    create(req, res) {
        Pet.find({
                name: req.body.name
            })
            .then(data => {
                console.log('we have duplicate names', data);
                if (data.length > 0) {
                    res.json({
                        err: ['Pet Name must be unique'],
                        errors: true
                    })
                } else {
                    console.log('we are making a new pet!')
                    Pet.create(req.body)
                        .then(data => res.json(data))
                        .catch(errorHandler.bind(res));
                }
            })
            .catch(errorHandler.bind(res));
    },
    update(req, res) {
        Pet.findOne({
                name: req.body.name
            })
            .then(pet => {
                console.log(pet);
                console.log(req.body);
                if (pet === null || pet['name'] === req.body.oldName) {
                    Pet.update({
                            _id: req.params.id
                        }, req.body, {
                            runValidators: true
                        })
                        .then(pet => res.json(pet))
                        .catch(errorHandler.bind(res));
                } else {
                    res.json({
                        err: ['Pet Name must be unique'],
                        errors: true
                    })
                }
            })
            .catch(errorHandler.bind(res));
    },
    //     Pet.update({
    //             _id: req.params.id
    //         }, {
    //             name: req.body.name,
    //             type: req.body.type,
    //             description: req.body.description,
    //             skill1: req.body.skill1,
    //             skill2: req.body.skill2,
    //             skill3: req.body.skill3
    //         }, {
    //             new: true,
    //             runValidators: true
    //         })
    //         .then(data => res.json(data))
    //         .catch(errorHandler.bind(res));
    // },
    like(req, res) {
        Pet.findOneAndUpdate({
                _id: req.params.id
            }, {
                $inc: {
                    likes: 1
                }
            }, {
                new: true //use new:true to return the document AFTER the update was applied
            })
            .then(data => res.json(data))
            .catch(errorHandler.bind(res));
    },
    destroy(req, res) {
        Pet.findByIdAndRemove(req.params.id)
            .then(result => res.json(result))
            .catch(errorHandler.bind(res));
    },
};