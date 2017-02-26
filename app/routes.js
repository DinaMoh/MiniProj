// require dependincies
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');
var userController = require('./controllers/userController');

// add routes
// Project Routes
router.get('/', projectController.getAllProjects);
router.get('/get/:id', projectController.findProject);
router.get('/remove/:id', projectController.deleteProject);
router.post('/project', projectController.createProject);

// User routes
router.get('/getAllUsers', userController.getAllUsers);
router.get('/login', userController.loginUser);
router.post('/regUser', userController.createUser);

// export router
module.exports = router;
