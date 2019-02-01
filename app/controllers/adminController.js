var isLoggedIn = require('../middlewares/isLoggedIn');
var authenticated_using = require('../helpers/authenticated_using')
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dest = __dirname + '/../../uploads/';
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split('.')[1];
        cb(null, file.fieldname + '.' + ext);
    }
})
var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'room_list', maxCount: 1 }, { name: 'teacher_list', maxCount: 1 }, { name: 'schedule_list', maxCount: 1 }])
module.exports = function (app) {

    app.get('/admin', isLoggedIn, function (req, res) {
        auth_user = authenticated_using(req)

        //res.json(tododoc) //uncomment if developing only APIs
        res.render('admin', { 'user': auth_user })
    })
    app.post('/upload', isLoggedIn, cpUpload, function (req, res) {
        auth_user = authenticated_using(req)

        //res.json(tododoc) //uncomment if developing only APIs
        res.send('Uploaded successfully!')
    })
    app.post('/start', isLoggedIn, (req, res) => {
        res.send("finished")
    })


}