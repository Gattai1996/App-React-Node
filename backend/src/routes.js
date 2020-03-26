const express = require('express');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const ProfileController = require('./controllers/ProfileController');
const GameController = require('./controllers/GameController');

const routes = express.Router();

routes.post('/session', SessionController.create)

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile', ProfileController.index)

routes.get('/games', GameController.index);
routes.post('/games', GameController.create);
routes.delete('/games/:id', GameController.delete);

module.exports = routes;