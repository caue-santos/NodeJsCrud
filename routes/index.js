
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:senha@host/base);
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    nome: { type: String, required: true },
    email: String,
    telefone: String
}, { collection: 'contatos' });

var Contatos = mongoose.model('UserData', userDataSchema);

router.get('/new', function (req, res, next) {
    res.render('new');
});

router.post('/new', function (req, res, next) {
    var item = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone
    };

    var data = new Contatos(item);
    data.save();

    res.redirect('/');
});

router.get('/', function (req, res, next) {
    Contatos.find()
        .then(function (doc) {
            res.render('index', { items: doc });
        });
});

router.get('/edit', function (req, res, next) {
    res.render('edit');
});

router.post('/edit', function (req, res, next) {
    var id = req.body.id;

    Contatos.findById(id, function (err, doc) {
        if (err) {
            console.error('error, no entry found');
        }
        doc.nome = req.body.nome;
        doc.email = req.body.email;
        doc.telefone = req.body.telefone;
        doc.save();
    })
    res.redirect('/');
});

router.get('/delete', function (req, res, next) {
    res.render('delete');
});

router.post('/delete', function (req, res, next) {
    var id = req.body.id;
    Contatos.findByIdAndRemove(id).exec();
    res.redirect('/');
});

module.exports = router;