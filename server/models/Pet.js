let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let petSchema = new Schema({
    name: {
        type: String,
        trim: true,
        //unique: true,
        required: [true, "The pet must have a name. Name needs to be at least 3 characters long"],
        minlength: [3, "Name of pet must be at least 3 characters long"],
    },
    type: {
        type: String,
        trim: true,
        minlength: [3, "Type of pet entered must be at least 3 characters long"]
    },
    description: {
        type: String,
        trim: true,
        //unique: true,
        minlength: [3, "Description of pet must be at least 3 characters long"]
    },
    skill1: {
        type: String,
        trim: true,
    },
    skill2: {
        type: String,
        trim: true,
    },
    skill3: {
        type: String,
        trim: true,
    },
    likes: {
        type: Number,
    },
}, {
    timestamps: true
});

// we can attach unique valid as a plugin to make any field unique
// petSchema.plugin(uniqueValid, {
//     message: `{PATH} must be unique!`
// });

// make the model
mongoose.model('Pet', petSchema);