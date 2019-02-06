const axios = require('axios');
const app = require('./app')


describe("Test routes against local version of express app", ()=>{
    beforeEach(()=>{
        app.resetTasks()
    })

    describe("Get full list of tasks", ()=>{
        it("receives correct list of tasks", ()=>{
            return axios.get('http://localhost:3000/tasks')
            .then(function(response){
                expect(response.data).toEqual([
                    {'task_id': 1, 'description': "feed the cat", 'completed': false, 'user_id': 1},
                    {'task_id': 2, 'description': "pick up groceries", 'completed': false, 'user_id': 1},
                    {'task_id': 3, 'description': "cook dinner", 'completed': false, 'user_id': 2}
                  ]);
            })
        })
    })

    describe("Gets all tasks for user 1", ()=>{
        it("receives correct tasks", ()=>{
            return axios.get('http://localhost:3000/tasks/userid/1')
            .then(function(response){
                expect(response.data).toEqual([
                    {'task_id': 1, 'description': "feed the cat", 'completed': false, 'user_id': 1},
                    {'task_id': 2, 'description': "pick up groceries", 'completed': false, 'user_id': 1},
                  ]);
            })
        })
    })

    describe("Gets task 1", ()=>{
        it("receives correct task", ()=>{
            return axios.get('http://localhost:3000/tasks/1')
            .then(function(response){
                expect(response.data).toEqual(
                    [{'task_id': 1, 'description': "feed the cat", 'completed': false, 'user_id': 1}],
                  );
            })
        })
    })

    describe("Add a new task", ()=>{
        it("receives a success response", ()=>{
            const taskToAdd ={"task_id":4,"description":"new task", "completed": false, "user_id":3};
            return axios.post('http://localhost:3000/tasks', taskToAdd)
            .then(function(response){
                expect(response.status).toEqual(200);
            })
        })
    })

    describe("Update task 1", ()=>{
        it("receives a success response", ()=>{
            const taskToUpdate = {"task_id": 1, "description": "feed the cat", "completed": true, "user_id": 1}
            return axios.put('http://localhost:3000/tasks/1', taskToUpdate)
            .then(function(response){
                expect(response.status).toEqual(200);
            })
        })
    })

    describe("Delete task 1", ()=>{
        it("receives a success response", ()=>{
            return axios.delete('http://localhost:3000/tasks/1')
            .then(function(response){
                expect(response.status).toEqual(200);
            })
        })
    })

})