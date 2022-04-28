const { Schema, model } = require('mongoose');

// { $trim: { input: <string>,  chars: <string> } }
// Do I add trim as trim: true here or do I add it elsewhere

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // add in match a valid email
        },
        thoughts:
        [thoughtsSchema],
        
        friends:
        [userSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model ('user', userSchema);

module.exports = User;




/*import { isEmail } from 'validator';
// ... 

const EmailSchema = new Schema({
    email: { 
        //... other setup
        validate: [ isEmail, 'invalid email' ]
    }
});



var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var EmailSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});

https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
*/ 