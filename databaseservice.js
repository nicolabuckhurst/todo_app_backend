const mysql = require('mysql');

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
}

function queryDatabase(sql, params) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        connection.query(sql, params, function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end(function(err){
                    return resolve(results);
                });
            }
        });
    });
}

const databaseService = {

    getTasks: function() {
        const sql = "SELECT * FROM Tasks"
        return queryDatabase(sql)
    },

    getTasksByUser: function(userId) {
        const sql = `SELECT * FROM Tasks WHERE userId = ${userId}`
        return queryDatabase(sql)

    },

    getTasksById: function(taskId) {
        const sql = `SELECT * FROM Tasks WHERE taskId = ${taskId}`
        return queryDatabase(sql)
    },

    addTask: function(task) {
        const sql = "INSERT INTO Tasks (taskDescription, taskCompleted, userId) VALUES ?"
        const params = [[task.taskDescription, task.taskCompleted, task.userId]]

        return queryDatabase(sql, [params])
    },

    addUser: function(user) {
        const sql = `INSERT INTO Tasks (username) VALUES (${user["username"]})`

        return queryDatabase(sql)
    }, 

    updateTask: function(taskId, taskDetails){
        const sql = "UPDATE Tasks SET ? WHERE taskId = ?"
        const params = [taskDetails, taskId]
        return queryDatabase(sql, params)
    },


    deleteTask: function(taskId){
        const sql = `DELETE FROM Tasks WHERE taskId = ${taskId}`

        return queryDatabase(sql)
    },

    defaultDatabase: function(){
        const sql = "DELETE FROM Tasks"
        return queryDatabase(sql)
        .then(function(response){
            const sql = "INSERT INTO Tasks (taskDescription, taskCompleted, userId) VALUES ?"
            const params = [["feed the cat", 0, 1],["pick up groceries", 0, 1],["cook dinner", 0, 2]]
            return queryDatabase(sql, [params])
        })
    }
}



module.exports = {
   databaseService
}