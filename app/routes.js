// require dependincies
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');
var userController = require('./controllers/userController');
var portfolioController = require('./controllers/portfolioController');

// add routes
// Project Routes
// router.get('/', projectController.getTenProjects);
router.get('/gnT/:no', projectController.getTenProjects);
router.get('/getAllProjects', projectController.getAllProjects);
router.get('/get/:id', projectController.findProject);
router.get('/remove/:id', projectController.deleteProject);
router.get('/getUserProjects', projectController.getUserProjects);
router.post('/project', projectController.createProject);
router.get('/removeAllProjects', projectController.deleteAllProjects);
router.get('/viewSingleProj/:id', projectController.viewSingleProj);

router.get('/getAllUsers', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.post('/regUser', userController.createUser);
router.get('/logout', userController.logout);
router.get('/removeAllUsers', userController.deleteAllUsers);

router.get('/getUserPort', portfolioController.getUserPort);
router.post('/createPortfolio', portfolioController.createPort);
router.get('/removeAllPortfolios', portfolioController.deleteAllPorts);
router.get('/', portfolioController.getTenPort);
// export router
module.exports = router;
