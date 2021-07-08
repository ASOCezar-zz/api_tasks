const { Router } = require('express');
const TaskController =  require('./app/Controllers/TaskController')
const DashboardController = require('./app/Controllers/DashboardController')

const routes  = new Router();

routes.get('/', DashboardController.index);
routes.post('/', TaskController.add);
routes.get('/task-edit/:id', TaskController.show)
routes.post('/task-edit/:id', TaskController.update)


module.exports = routes;