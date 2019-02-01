var isLoggedIn = require('../middlewares/isLoggedIn');
var authenticated_using = require('../helpers/authenticated_using')
var multer = require('multer');
var archiver = require('archiver');
var fs = require('fs')
const zip = (cb,fileName,glob) => {
   
    var fileOutput = fs.createWriteStream(fileName);
    let archive = archiver('zip');
    fileOutput.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        cb();
    });

    archive.pipe(fileOutput);
    archive.glob(glob); 
    archive.on('error', function (err) {
        throw err;
    });
    archive.finalize();
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dest = __dirname + '/../../python/uploads/';
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

        res.render('admin', { 'user': auth_user })
    })
    app.post('/upload', isLoggedIn, cpUpload, function (req, res) {
        auth_user = authenticated_using(req)

        res.send('Uploaded successfully!')
    })
    app.post('/start', isLoggedIn, (req, res) => {
        res.send("finished")
    })
    app.get('/prevFiles', isLoggedIn, (req, res) => {
        zip(()=>{
            var filePath = __dirname + "/../../python/uploads/files.zip"
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'application/zip',
                'Content-Length': stat.size
            });
    
            var readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        },'./python/uploads/files.zip',"./python/uploads/*.xlsx")

                                       
    })
    app.get('/output', isLoggedIn, (req, res) => {
        zip(()=>{
            var filePath = __dirname + "/../../python/output/files.zip"
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'application/zip',
                'Content-Length': stat.size
            });
    
            var readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        },'./python/output/files.zip',"./python/output/*.xlsx")
    })


}