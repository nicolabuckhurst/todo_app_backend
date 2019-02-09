checkTasks = require('./checkTasks')

describe("unit tests for tasks function", ()=>{

    test("it checks format of new task correctly ", ()=>{
        const correctTask = {"taskId":null, "taskDescription":"new task", "taskCompleted": 0, "userId":3}
        const taskWrongKey = {"task_id":null,"taskDescription":"new task", "taskCompleted": 0, "userId":3}
        const taskWrongValueType = {"taskId":null, "taskDescription":"new task", "taskCompleted": 0, "userId":"3"}
        expect(()=>checkTasks.checkJSONTask(correctTask)).not.toThrow()
        expect(()=>checkTasks.checkJSONTask(taskWrongKey)).toThrow("did not receive task with valid keys")
        expect(()=>checkTasks.checkJSONTask(taskWrongValueType)).toThrow("did not receive task with valid userId")
    })

})
