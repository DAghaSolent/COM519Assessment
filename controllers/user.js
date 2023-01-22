const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    try {

        const user = new User({ email: req.body.email, password: req.body.password });
        await user.save();
        res.redirect('/home')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('sign-up', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.render('login-user', { errors: { email: { message: 'email not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        
        if (match) {
            req.session.userID = user._id;
            res.redirect('/home')
            console.log(req.session.userID);
            return
        }

        res.render('login-user', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}