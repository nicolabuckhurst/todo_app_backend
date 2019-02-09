const express = require('express'); 
const bodyparser = require('body-parser')
const checkTasks = require ('./checkTasks')
const cors = require('cors')

const app = express();

const databaseService = require('./databaseservice').databaseService

app.use(cors())
app.use(bodyparser.json())


/**** ROUTES ******/

//return all tasks
app.get('/tasks', function(req, res){
  databaseService.getTasks()
  .then(function(results){
    //we got tasks ok
    res.json(results)

  })
  .catch(function(error){
    //something went wrong
    res.status(500).json(error)
  })
})


//return all tasks for a particular user
app.get('/tasks/userid/:userId', function(req, res){
  databaseService.getTasksByUser(req.params.userId)
  .then(function(results){
    //we got tasks ok
    res.json(results)

  })
  .catch(function(error){
    //something went wrong
    res.status(500).json(error)
  })
})

//return a particular task
app.get('/tasks/:taskId', function(req, res){
  databaseService.getTasksById(req.params.taskId)
  .then(function(results){
    //we got tasks ok
    res.json(results)

  })
  .catch(function(error){
    //something went wrong
    res.status(500).json(error)
  })
})


//add a new task
app.post('/tasks', function(req, res){
  const taskToAdd = req.body;

  try{
    checkTasks.checkJSONTask(taskToAdd);
  } catch(e) {
    res.status(500).send(e);
  }

  databaseService.addTask(taskToAdd)
  .then(function(results){
    //we got tasks ok
    res.json(results)

  })
  .catch(function(error){
    //something went wrong
    res.status(500).json(error)
  })
})

//update a task
app.put('/tasks', function(req,res){
    
  const newTaskDetails = req.body;

  try {
    checkTasks.checkJSONTask(newTaskDetails);
  } catch(e){
    res.status(500).send(e);
  }

  databaseService.updateTask(newTaskDetails)
  .then(function(results){
    //we got tasks ok
    res.json(results)

  })
  .catch(function(error){
    //something went wrong
    res.status(500).json(error)
  })
})

//delete a task
app.delete('/tasks/:taskId', function(req,res){
  const taskToDelete = req.params.taskId
  
  databaseService.deleteTask(taskToDelete)
  .then(function(results){
    //we got tasks ok
    res.json(results)

  })
  .catch(function(error){
    //something went wrong
    res.status(500).json(error)
  })


})

module.exports = app;