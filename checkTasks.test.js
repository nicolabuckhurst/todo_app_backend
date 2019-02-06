checkTasks = require('./checkTasks')

describe("unit tests for tasks function", ()=>{

    test("it checks format of new task correctly ", ()=>{
        const correctTask = {"task_id":4,"description":"new task", "completed": false, "user_id":3}
        const taskWrongKey = {"taskid":4,"description":"new task", "completed": false, "user_id":3}
        const taskWrongValueType = {"task_id":"4","description":"new task", "completed": false, "user_id":3}
        expect(()=>checkTasks.checkJSONTask(correctTask)).not.toThrow()
        expect(()=>checkTasks.checkJSONTask(taskWrongKey)).toThrow("did not receive task with valid keys")
        expect(()=>checkTasks.checkJSONTask(taskWrongValueType)).toThrow("did not receive task with valid task_id")
    })

    test("you can filter arrayOfTasks correctly", ()=>{
        const arrayOfTasks = [
            {'task_id': 1, 'description': "feed the cat", 'completed': false, 'user_id': 1},
            {'task_id': 2, 'description': "pick up groceries", 'completed': false, 'user_id': 1},
            {'task_id': 3, 'description': "cook dinner", 'completed': false, 'user_id': 2}
          ];

        expect(checkTasks.filterTasksByParameter("user_id", 1, arrayOfTasks)).toEqual([{'task_id': 1, 'description': "feed the cat", 'completed': false, 'user_id': 1},
        {'task_id': 2, 'description': "pick up groceries", 'completed': false, 'user_id': 1}])
    })

})
