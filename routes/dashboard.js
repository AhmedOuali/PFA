var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var multer  =   require('multer');
var fs = require('fs');


//-------------obtenir la photo de profil a travers un lien securisé -------------
//--------------------------------------------------------------------------------



//---------------------------------------------------------------------------
//---------------------------------------------------------------------------



router.get('/', function(req, res, next) {
    jwt.verify(req.cookies.token, 'secret', function(err, decoded) {    
        if (!err) {
            res.render('dashboard', { title: 'Express' });
        }
        next();
    });
});


//---------------------------------------Uploading UserProfilPhotos-------------------------
//--------------------------------------------------------------------------------

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './storage/images/userprofil');
  },
  filename: function (req, file, callback) {
    callback(null, 'file' + '-' + req.cookies.user_id + '.jpg');
  }
});

var upload = multer({ storage : storage }).single('file');

router.post('/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.status(500).json({
                title: 'Erreur',
                message: "Echec D'upload de l'image"
            });
        }
        res.status(201).json({
            title: 'Succés',
            message: 'Votre upload a était effectué avec succés'
        });
    });
});



//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

//tester l'existance d'une image de profil
router.get('/filetest-:id'+'.jpg', function(req, res, next) {
  var id = req.params.id;
  var  filepath= 'storage/images/userprofil/file-'+id+'.jpg';
  var flag = true;
  try{
    fs.accessSync(filepath, fs.F_OK);
  }catch(e){
    flag = false;
  }
     if(flag){
         return res.status(201).json({
                    title: 'Succés',
                    message: 'Image trouvée',
                    url: 'http://pfa01-xcapo32.c9users.io/images/userprofil/file-'+id+'.jpg'
                });
     }   
     
         res.status(201).json({
            title: 'erreur',
            message: 'Image non trouvée',
            url: 'http://pfa01-xcapo32.c9users.io/images/userprofil/default-user-image.png'
        });
     
});

module.exports = router;