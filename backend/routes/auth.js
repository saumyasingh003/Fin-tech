const express = require ('express');
const {check} = require('express-validator');
const Auth = require('../controllers/auth.js');
const validate = require('../middlewares/validate');
const UserModel = require('../models/UserModel');
const passport = require('passport')
const router = express.Router();
const authenticateMiddleware = require("../middlewares/authenticate")

router.get('/', (req, res) => {
    res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

router.post('/register', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('username').not().isEmpty().withMessage('You username is required'),
    check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    check('firstName').not().isEmpty().withMessage('You first name is required'),
    check('lastName').not().isEmpty().withMessage('You last name is required')
], validate, Auth.register);

router.post("/login", [
    check('username').not().isEmpty().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], validate, Auth.login);

//lets say, I want list of users registerd to be fetched using api..

router.get('/users',authenticateMiddleware,async(req, res)=>{//ha to kyu ye api call kr rhi ho
    //dekho terminal me koi error throw nhi kiya...isliye try catch block use krte h..taki error pakar le
    try{
        console.log(req.user)

        const user = await UserModel.find();//jiss bhi model ka data chahiye..sbse pehle usko import krna hota h... .find method se hm pura database fetch kr skte h
        //ab yaha ek condition lagayenge
       res.status(200).json({user})//json format me user aa jayega..pehle jwt hta dete h
       //are you here? yup..error pata chala tmhe kaha hai? nhi...because maine await use nhi kiya h....asycn await hm isliye use krte h takiki jab tk api call nhi ho jata...tb tk aage ka sara operation ruka rhe....nhi to sab ek sath execute hone lag jayega//dekho aa gya na list hmm....ab waha authntication laga ..dekho aa gya error... hmm,,,ab token pass krke dekhte h  
    }catch(err){
        console.log(err)
    }

})

module.exports = router;