var mongoose = require('mongoose');
var service = require('../../../services/app.services');
// Account-Type 0---> Admin/ 1---> Customer 
const UserModel = new mongoose.Schema({
    avatar: String,
    name: {
        type: String,
        maxlength: 100,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        //maxlength: 100,
        unique: true,
        required: [true, 'Email is required'],
    },
    mobile: {
        type: String,
        // maxlength: 100,
        required: [true, 'Mobile is required'],
    },
    city: {
        type: String,
        // maxlength: 100,
        required: [true, 'City is required'],
    },
    state: {
        type: String,
        // maxlength: 100,
        required: [true, 'State is required'],
    },
    zipcode: {
        type: String,
        // maxlength: 100,
        required: [true, 'Zip Code is required'],
    },
    password: {
        type: String,
        maxlength: 100,
        required: [true, 'Password is required'],
    },
    account_type: {
        type: Number,
        enum: [0, 1]
    },
    terms: {
        type: Boolean,
        default: false
    },
    first_order: {
        type: Boolean,
        default: false
    },
    access_token: String,
    reset_password_token: String,
    reset_expiry: Date,
    creationDate: {
        type: Date,
        default: Date.now
    },
    device_token: String,
}, {
    collection: "users"
})
UserModel.pre("save", async function (next) {
    let user = this;
    if (!this.isModified("password")) {
        return next();
    }
    try {
        let result = await service.incryptData(user.password);
        user.password = result;
        next();
    } catch (error) {
        next(error);
    }
});



module.exports = mongoose.model("users", UserModel)