const express = require('express'); 
const bodyparser = require('body-parser')
const checkTasks = require ('./checkTasks')
const cors = require('cors')

const app = express();

const databaseService = require('./databaseservice').databaseService
const Task = require('./task').Task

app.use(cors())
app.use(bodyparser.json())


/**** ROUTES ******/

//return all tasks
app.get('/tasks', function(req, res){
  databaseService.getTasks()
  .then(function(results){
    //convert tasks into an array of Task objects
    let arrayOfTasks = []
    let result
    for(i=0; i<results.length; i++){
      result = results[i]
      arrayOfTasks.push(new Task(result.taskDescription, result.userId, result.taskCompleted, result.taskId))
    }
    console.log(arrayOfTasks)
    res.status(200).json(arrayOfTasks)

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
    //turn result into an array of task objects
    let arrayOfTasks = []
    let result
    for(i=0; i<results.length; i++){
      result = results[i]
      arrayOfTasks.push(new Task(result.taskDescription, result.userId, result.taskCompleted, result.taskId))
    }
    console.log(arrayOfTasks)
    res.status(200).json(arrayOfTasks)
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
    //turn result into a single task object
    let task = new Task(results[0].taskDescription, results[0].userId, results[0].taskCompleted, results[0].taskId)
    console.log(task)
    res.status(200).json(task)
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
  .then(function(){
    res.status(200).json({message:"task added"})

  })
  .catch(function(error){
    //something went wrong
    res.status(500).json(error)
  })
})

//update a task
app.put('/tasks/:taskId', function(req,res){
  
  const taskId = req.params.taskId;
  const newTaskDetails = req.body;

  try {
    checkTasks.checkJSONTask(newTaskDetails);
  } catch(e){
    res.status(500).send(e);
  }

  databaseService.updateTask(taskId, newTaskDetails)
  .then(function(){
    //we got tasks ok
    res.status(200).json({message:"task updated"})

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
  .then(function(){
    
    res.status(200).json({message:"task deleted"})

  })
  .catch(function(error){
    //something went wrong
    res.status(500).json(error)
  })


})

module.exports = app;