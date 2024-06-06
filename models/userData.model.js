
 const mongoose = require('mongoose');

 const isEmpty = (value) => {
    return value && value.trim().length > 0;
};


const userDataSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: [true, 'Full name is required'],
        minlength: [3, 'Full name must be at least 3 characters long'],
        maxlength: [50, 'Full name must be less than 50 characters long'],
        validate: {
            validator: isEmpty,
            message: 'Full name cannot be empty or contain only spaces'
        }
    },
    username: { 
        type: String, 
        required: [true, 'Username is required and it should be of type email'],
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be of atleast 6 characters'],
        validate: {
            validator: isEmpty,
            message: 'Password cannot be empty or contain only spaces'
        }
    },
    about: { 
        type: String,
        maxlength: [500, 'About section must be less than 500 characters long']
    },
    status: { 
        type: Boolean, 
        default: true 
    }
}, {
    timestamps: true,
    collection: 'userData',
    versionKey: false 
});

const userData = mongoose.model('userData', userDataSchema);

module.exports = { userData };
