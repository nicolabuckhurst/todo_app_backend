//filter task by supplied key and value
const filterTasksByParameter = function (key, value, tasks) {
    let filteredArray =[];
    filteredArray = tasks.filter((element)=>element[key]==value);
    console.log(filteredArray)
    return filteredArray;
  }
  
  
//check to see if the task received has correct fields and they are of the correct type
const checkJSONTask = function(receivedTask){
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
            throw "did not receive task with valid " + key
        }
    }    

}

module.exports = {
    filterTasksByParameter: filterTasksByParameter,
    checkJSONTask: checkJSONTask
}