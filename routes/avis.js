var express = require('express');
var router = express.Router();
var Avis = require('../models/avis');

router.get('/', function (req, res, next) {
    Avis.find()
        .exec(function (err, aviss) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: aviss
            });
        });
});
router.post('/', function (req, res, next) {
    var avis = new Avis({
        content: req.body.content, 
        name: req.body.name,
        email: req.body.email
    });
    avis.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Erreur reseau',
                message: "Votre contribution n'a pas était ajouté",
                obj: avis
            });
        }
        res.status(201).json({
            title: 'Saved avis',
            message: 'Votre contribution est ajouté avec succès',
            obj: avis
        });
    });
});
module.exports = router;