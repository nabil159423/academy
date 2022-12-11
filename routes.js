express = require('express');
router = express.Router();
let catalogueController = require('./controllers/catalogueController');
let userController = require('./controllers/userController');
let panierController = require('./controllers/panierController');


router.get('/',(req,res)=>res.redirect('/catalogue'));
router.get('/catalogue',catalogueController.formationList);


router.get('/user',userController.connection);
// router.get('/user',(req,res)=>res.render('user.ejs'));
router.post('/user',userController.username);


router.post('/panier',panierController.addFormation);
router.get('/panier',panierController.showPanier);
router.post('/panier/delete',panierController.deleteFormation);
// router.get('/panier/delete',(req,res)=>res.redirect('/panier'));

router.get('/panier/finaliser',panierController.finaliser);
router.post('/panier/finaliser',panierController.prefinaliser);




module.exports= router;