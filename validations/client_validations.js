//Dependencies Imported :
const { check } = require("express-validator");



//Express Validations for client :
module.exports = function client_validator() {

    return [

        //Validation for client name :
        check("client_name")
            .notEmpty().withMessage("Please enter client name").bail(),

        //Validation for address :
        check("billing_address")
            .notEmpty().withMessage("Please enter address").bail(),

        //Validation for date of contract :
        check("date_of_contract")
            .notEmpty().withMessage("Please enter date of contract").bail(),

        //Validation for payment terms :
        check("payment_terms")
            .notEmpty().withMessage("Please enter payment terms").bail(),
    ];
};