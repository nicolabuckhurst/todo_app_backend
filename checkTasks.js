//check to see if the task received has correct fields and they are of the correct type
const checkJSONTask = function(receivedTask){
    const expectedData = {taskDescription: 'string', taskCompleted: 'number', userId: 'number'}
    const expectedKeys = Object.keys(expectedData);
    const receivedKeys = Object.keys(receivedTask);
    
    if(receivedTask == {}){
        throw "task object is empty"
    }


    for(i=0; i<receivedKeys.length; i++){
        if(receivedKeys[i] != expectedKeys[i]){
            throw "did not receive task with valid keys"
        }
    }
      
    for (const key in receivedTask) {
        if(expectedData[key] != (typeof receivedTask[key])){
            throw "did not receive task with valid " + key
        }
    }
}

module.exports = {
    checkJSONTask: checkJSONTask
}