const request = require('supertest');
const app = require('./app');
const databaseService = require('./databaseservice').databaseService

//when testing response from database don't include task_id in the comparion objects.......task_id is auto
//incrementing so will be different each time the tests are run. Use Jest toMatchObject matcher as it will match an object even if it
//has extra keys to the comparison object. It also will work to compare arrays of objects

describe("Test routes against local version of express app", ()=>{
    beforeEach(()=>{
        return databaseService.defaultDatabase()
    })

    describe("Get full list of tasks", ()=>{
        it("returns correct list of tasks", ()=>{
            return request(app).get('/tasks')
            .then(response => JSON.parse(response.text))
            .then(function(body){
                const comparisonArray = [
                    {'taskDescription': "feed the cat", 'taskCompleted': 0, 'userId': 1},
                    {'taskDescription': "pick up groceries", 'taskCompleted': 0, 'userId': 1},
                    {'taskDescription': "cook dinner", 'taskCompleted': 0, 'userId': 2}
                ]
                expect(body).toMatchObject(comparisonArray);
            })
        })
    })

    describe("Gets all tasks for user 1", ()=>{
        it("returns correct tasks", ()=>{
            return request(app).get('/tasks/userid/1')
            .then(response => JSON.parse(response.text))
            .then(function(body){
                const comparisonArray = [
                    {'taskDescription': "feed the cat", 'taskCompleted': 0, 'userId': 1},
                    {'taskDescription': "pick up groceries", 'taskCompleted': 0, 'userId': 1},
                ]
                expect(body).toMatchObject(comparisonArray);
             })
        })
    })

    describe("Gets task 1", ()=>{
        it("returns correct task", ()=>{
            return databaseService.getTasks()
            .then(function(response){
                return response[0]["taskId"]
            })
            .then(function(taskId){
                return request(app).get('/tasks/' + taskId)
            })
            .then(response => JSON.parse(response.text))
            .then(function(body){
                 expect(body).toMatchObject({'taskDescription': "feed the cat", 'taskCompleted': 0, 'userId': 1})
             })
         })
    })

    describe("Add a new task", ()=>{
        it("receives a success response", ()=>{
             const taskToAdd ={"taskDescription":"new task", "taskCompleted": 0, "userId":2};
             return request(app)
                        .post('/tasks')
                        .send(taskToAdd)
                        .set('Accept', 'application/json')
             .then(function(response){
                 expect(response.status).toEqual(200);
             })
         })
    })

    describe("Update a task ", ()=>{
        it("receives a success response", ()=>{
            return databaseService.getTasks()
            .then(function(response){
                return response[0]
            })
            .then(function(task){
             const newTaskDetails = {"taskCompleted": 1}
             return request(app)
                .put('/tasks/' + task["taskId"])
                .send(newTaskDetails)
                .set('Accept', 'application/json')
            })
             .then(function(response){
                 expect(response.status).toEqual(200);
             })
         })
    })

    describe("Delete task 1", ()=>{
        it("receives a success response", ()=>{
            return databaseService.getTasks()
            .then(function(response){
                return response[0]
            })
            .then(function(task){
                return request(app).delete('/tasks/' + task["taskId"])
            })
            .then(function(response){
                expect(response.status).toEqual(200);
            })
         })
    })

})