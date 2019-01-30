var Todo = require('../models/todo');
var isLoggedIn = require('../middlewares/isLoggedIn');
var authenticated_using = require('../helpers/authenticated_using')
var fs=require('fs');
var multer=require('multer');
var storage=multer.diskStorage({
    destination:function(req,file,cb){
      var dest=__dirname+'/../../public/uploads/';
      cb(null,dest);
    },
    filename:function(req,file,cb){
      cb(null,file.originalname);
    }
  })
  var uploading=multer({storage:storage});
module.exports = function (app) {

    app.get('/admin', isLoggedIn, function (req, res) {
        auth_user = authenticated_using(req)
      
            //res.json(tododoc) //uncomment if developing only APIs
            res.render('admin', {'user': auth_user})
        })
    app.post('/upload', isLoggedIn,uploading.array('thumbnail',3), function (req, res) {
        auth_user = authenticated_using(req)
        
            //res.json(tododoc) //uncomment if developing only APIs
            res.send('Uploaded successfully!')
        })
   

}