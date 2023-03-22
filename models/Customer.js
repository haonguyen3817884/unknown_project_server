const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    token: {
        type: String,
        default: ""
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;