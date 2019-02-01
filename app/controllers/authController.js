var isLoggedIn = require('../middlewares/isLoggedIn');
var authenticated_using = require('../helpers/authenticated_using')

module.exports = function (app, passport) {


    app.get('/', function (req, res) {
        res.render('home.ejs');
    });

    app.get('/login', function (req, res) {
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function (req, res) {

        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.get('/profile', isLoggedIn, function (req, res) {
        auth_user = authenticated_using(req)
        res.render('profile.ejs', {
            user: auth_user,
            link:"/prevFiles",
            link2:"/output"
        });
    });

    // LOGOUT
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};