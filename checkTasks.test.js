checkTasks = require('./checkTasks')

describe("unit tests for tasks function", ()=>{

    test("it checks format of new task correctly ", ()=>{
        const perfectMatchTask = {"taskDescription":"new task", "taskCompleted": 0, "userId":3}
        const correctDiffOrder = {"taskCompleted": 0, "taskDescription":"new task", "userId":3}
        const taskWrongKey = {"taskDescription":"new task", "taskCompleted": 0, "user_Id":3}
        const missingKey ={"taskDescription": "new task", "taskCompleted":0}
        const taskWrongValueType = {"taskDescription":"new task", "taskCompleted": 0, "userId":"3"}
        expect(()=>checkTasks.checkJSONTask(perfectMatchTask)).not.toThrow()
        expect(()=>checkTasks.checkJSONTask(correctDiffOrder)).not.toThrow()
        expect(()=>checkTasks.checkJSONTask(taskWrongKey)).toThrow("did not receive task with valid parameters")
        expect(()=>checkTasks.checkJSONTask(missingKey)).toThrow("did not receive task with valid parameters")
        expect(()=>checkTasks.checkJSONTask(taskWrongValueType)).toThrow("did not receive task with valid userId")
    })

})

describe("unit tests for creating allowed update fields object", ()=>{
    
    test("it only returns allowed fields", ()=>{
        const allowedFields = {"taskDescription":"new task", "taskCompleted": 0}
        const allowedField = {"taskDescription":"new task"}
        const noallowedFields = {"userId": 1}
        const somenonallowedFields = {"taskDescription":"new task", "taskCompleted": 0, userId:0}
        expect(checkTasks.createAllowedUpdateDetails(allowedFields)).toMatchObject({"taskDescription":"new task", "taskCompleted": 0})
        expect(checkTasks.createAllowedUpdateDetails(allowedField)).toMatchObject({"taskDescription":"new task"})
        expect(()=>checkTasks.createAllowedUpdateDetails(noallowedFields)).toThrow("did not send a 'taskDescription' or 'taskCompleted' parameter to update")        
        expect(checkTasks.createAllowedUpdateDetails(somenonallowedFields)).toMatchObject({"taskDescription":"new task", "taskCompleted": 0})
    })


})
