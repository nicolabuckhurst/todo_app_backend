const serverless = require('serverless-http');
const express = require('express'); 
const bodyparser = require('body-parser')
const app = express();

app.use(bodyparser.json())

let arrayOfTasks = [
  {'task_id': 1, 'description': "feed the cat", 'completed': false, 'user_id': 1},
  {'task_id': 2, 'description': "pick up groceries", 'completed': false, 'user_id': 1},
  {'task_id': 3, 'description': "cook dinner", 'completed': false, 'user_id': 2}
];

//filter task by supplied key and value
function filterTasksByParameter(key, value) {
  let filteredArray =[];
  filteredArray = arrayOfTasks.filter((element)=>element[key]==value);
  console.log(filteredArray)
  return filteredArray;
}


//check to see if the task received has correct fields and they are of the correct type
function checkJSONTask(receivedTask){
  const expectedData = {task_id: 'number', description: 'string', completed: 'boolean', user_id: 'number'}
  const expectedKeys = Object.keys(expectedData);
  const receivedKeys = Object.keys(receivedTask);
  
  for(i=0; i<receivedKeys.length; i++){
    if(receivedKeys[i] != expectedKeys[i]){
      throw "did not receive task with valid keys"
    }
  }
    
  for (const key in receivedTask) {
    if(expectedData[key] != (typeof receivedTask[key])){
      throw "did not receive task with valid" + key
    }
  }    

}


/**** ROUTES ******/

//return all tasks
app.get('/tasks', function(req, res){
  res.json(arrayOfTasks);
})


//return all tasks for a particular user
app.get('/tasks/userid/:userId', function(req, res){
  const userId = req.params.userId;
  const tasksToReturn = filterTasksByParameter('user_id', userId);
  res.json(tasksToReturn);
})

//return a particular task
app.get('/tasks/:taskId', function(req, res){
  const taskId = req.params.taskId;
  const tasksToReturn = filterTasksByParameter('task_id', taskId);
  res.json(tasksToReturn);
})


//add a new task
app.post('/tasks', function(req, res){
  const taskToAdd = req.body;
try{
    checkJSONTask(taskToAdd);
    arrayOfTasks.push(taskToAdd);
} catch(e) {
    res.status(500).send(e);
}
  console.log(arrayOfTasks);
  res.status(200).send("task successfully added");
})

//update a task
app.put('/tasks/:taskId', function(req,res){
    
  const newTaskDetails = req.body;
  const taskToUpdate = req.params.taskId
  let newArrayOfTasks = []

  try {
    checkJSONTask(newTaskDetails);

    for(i=0;i<arrayOfTasks.length;i++){
      if(arrayOfTasks[i]["task_id"]==taskToUpdate){
        newArrayOfTasks.push(newTaskDetails)
      } else {
        newArrayOfTasks.push(arrayOfTasks[i])
      }
    }
  } catch(e){
    res.status(500).send(e);
  }

  arrayOfTasks = newArrayOfTasks
  console.log(arrayOfTasks)
  res.status(200).send("task updated successfully")
})

//delete a task
app.delete('/tasks/:taskId', function(req,res){

  const taskToDelete = req.params.taskId
  let newArrayOfTasks = [];

    for(i=0; i<arrayOfTasks.length;i++){
      if(arrayOfTasks[i]["task_id"]!=taskToDelete){
        newArrayOfTasks.push(arrayOfTasks[i])
      }
    }
    arrayOfTasks = newArrayOfTasks;
  
    console.log(arrayOfTasks)
    res.status(200).send("task deleted");

})

module.exports.handler = serverless(app);
