//Dependencies Imported :
var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



//Models Imported :
var Admin = require("../models/admin");



//Middleware's Imported :
var config = require("../config/config.json");



//Importing Constants :
var constants_function = require("../constants/constants");
var constants = constants_function("admin");



//Crud Operations :


//POST Request for SignIn :
router.post("/", async(req, res)=>{

    try {

        const {username, password} = req.body;

        //Finding Admin with username :
        const admin = await Admin.find({username: username});

        //Returning Error if Admin Not Found
        if (admin.length < 1) {
            return res.status(401).json({
                "status": {
                    "success": false,
                    "code": 401,
                    "message": constants.AUTHORIZATION_FAILED
                }
            });
        }

        //Comparing Hashed Password Using Bcrypt :
        bcrypt.compare(password, admin[0].password, (err, result) => {

            //Returning Error If Match Not Found
            if (err) {
                return res.status(401).json({
                    "status": {
                        "success": false,
                        "code": 401,
                        "message": constants.AUTHORIZATION_FAILED
                    }
                });
            }

            //Creating token If Match Found :
            if (result) {
                const token = jwt.sign(
                    {
                        email:admin[0].email,
                        adminId: admin[0]._id
                    },
                    config.ADMIN_JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );

                //Response :
                return res.status(200).json({
                    "status": {
                        "success": true,
                        "code": 200,
                        "message": constants.AUTHORIZATION_SUCCESFUL
                    },
                    token: token
                });
            }

            //Response for Error :
            res.status(401).json({
                "status": {
                    "success": false,
                    "code": 401,
                    "message": constants.AUTHORIZATION_FAILED
                }
            });
        });

    //Error Catching :
    } catch (err) {
        res.status(400).json({
            "status": {
                "success": false,
                "code": 400,
                "message": err.message
            }
        });
        console.log(err);
    }
});
  


module.exports = router;