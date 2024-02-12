const User = require('../models/UserModel');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
    // Make sure this account doesn't already exist
    User.findOne({email: req.body.email})//findOne function, koi ek particular field ko find krne ke liye use hota h..to yaha email ko ye khojega databse me...then se promise return hoga
        .then(user => {//if user email exists, then

            if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account.'});//ye message print kr dega regsiter ke time....or agar nhi hai email then new user bana dega

            // Create and save the user
            const newUser = new User(req.body);
            newUser.save()//save ho gya ab..save hone ke time bhi promise return krega or jwt token generate kr dega
                .then(user => res.status(200).json({message:"User registered Successfully!",token: user.generateJWT(), user: user, status:"1"}))
                .catch(err => res.status(500).json({message:err.message}));
        })
        .catch(err => res.status(500).json({success: false, message: err.message}));
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (!user) return res.status(401).json({msg: 'The username' + req.body.username + ' is not associated with any account. Double-check your username and try again.'});

            //validate password
            if (!user.comparePassword(req.body.password)) return res.status(401).json({message: 'Invalid email or password'});

            // Login successful, write token, and send back user
            res.status(200).json({token: user.generateJWT(), user: user});
        })
        .catch(err => res.status(500).json({message: err.message}));
};