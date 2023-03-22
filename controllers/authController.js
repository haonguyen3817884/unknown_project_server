const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { AUTHOR_EMAIL, AUTHOR_PASSWORD, AUTHOR_FIRST_NAME, AUTHOR_LAST_NAME } = require("../config/constants");

const register = async (req, response) => {
    try {
        const encryptedPassword = await bcryptjs.hash(AUTHOR_PASSWORD, 10);
        
        const customer = await Customer.create({
            email: AUTHOR_EMAIL,
            password: encryptedPassword,
            firstName: AUTHOR_FIRST_NAME,
            lastName: AUTHOR_LAST_NAME,
            token: ""
        });

        return response.send({
            error: false,
            message: "",
            data: customer
        });
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

const login = async (req, response) => {
    try {
        const { email, password } = req.body;

        if (email === undefined || password === undefined) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        const customer = await Customer.findOne({
            email: email
        });

        if (customer === undefined || customer === null) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        if (!(await bcryptjs.compare(password, customer.password))) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        const token = jwt.sign({
            _id: customer._id
        }, process.env.TOKEN_KEY,
        {
            expiresIn: "2h"
        });

        customer.token = token;

        await customer.save();

        return response.send({
            error: false,
            message: "",
            data: customer
        });
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

const changePassword = async (req, response) => {
    try {
        const customerId = req.customer._id;
        
        const { password, newPassword } = req.body;

        if (password === undefined || newPassword === undefined) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        const customer = await Customer.findOne({_id: customerId});

        if (customer === undefined || customer === null) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        if (!(await bcryptjs.compare(password, customer.password))) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        customer.password = await bcryptjs.hash(newPassword, 10);

        await customer.save();

        return response.send({
            error: false,
            message: "Password is changed",
            data: []
        });
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

const getCustomerData = async (req, response) => {
    try {
        const customerId = req.customer._id;
        
        const customer = await Customer.findOne({_id: customerId});

        if (customer === undefined || customer === null) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        return response.send({
            error: false,
            message: "",
            data: customer
        });
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = {
    register,
    login,
    changePassword,
    getCustomerData
};