//check to see if the task received has correct fields and they are of the correct type
const checkJSONTask = function(receivedTask){
    const expectedData = {taskDescription: 'string', taskCompleted: 'number', userId: 'number'}
    const expectedKeys = Object.keys(expectedData);
    const receivedKeys = Object.keys(receivedTask);
    
    if(receivedTask == {}){
        throw "task object is empty"
    }

    console.log(expectedKeys)
    console.log(receivedKeys)

    let checks = {}
    for(i=0; i<expectedKeys.length; i++){
        for(j=0; j<receivedKeys.length; j++){
            if(expectedKeys[i] == receivedKeys[j]){
               checks[expectedKeys[i]] = true
            }
        }
    }

    console.log(Object.keys(checks).length)

    if(Object.keys(checks).length != expectedKeys.length){
        throw "did not receive task with valid parameters"
    }
      
    for (const key in receivedTask) {
        if(expectedData[key] != (typeof receivedTask[key])){
            throw "did not receive task with valid " + key
        }
    }
}

createAllowedUpdateDetails = function(newTaskDetails){


    const allowedUpdateFields = {"taskDescription":"string", "taskCompleted":"number"}
    
    const updateFields = {}
    
    for(receivedKey in newTaskDetails){
        for(allowedKey in allowedUpdateFields){
          if((receivedKey == allowedKey) && (typeof newTaskDetails[receivedKey] == allowedUpdateFields[allowedKey])){
            updateFields[receivedKey] =  newTaskDetails [receivedKey]
          } 
        }
    }

    if(Object.keys(updateFields).length == 0){
        throw "did not send a 'taskDescription' or 'taskCompleted' parameter to update"
    }

    return updateFields
}

module.exports = {
    checkJSONTask: checkJSONTask,
    createAllowedUpdateDetails: createAllowedUpdateDetails
}