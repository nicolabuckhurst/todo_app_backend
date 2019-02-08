const mysql = require('mysql');

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
}

function queryDatabase(sql) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        connection.query(sql, function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end();
                return resolve(results);
            }
        });
    });
}

const databaseService = {

    getTasks: function() {
        const sql = `SELECT * FROM Tasks`
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
        const sql = `INSERT INTO Tasks (taskDescription, taskCompleted, userId) 
        VALUES (${task["taskDescription"]}, ${task["taskCompleted"]}, ${task["userId"]})`

        return queryDatabase(sql)
    },

    addUser: function(user) {
        const sql = `INSERT INTO Tasks (username) 
        VALUES (${user["username"]})`

        return queryDatabase(sql)
    }, 

    updateTask: function(task){
        const sql = `UPDATE Tasks SET taskDescription = ${task["taskDescription"]}, taskCompleted = ${task["taskCompleted"]},
        userId = ${task["userId"]} WHERE taskId = ${task["taskId"]}`

        return queryDatabase(sql)
    },


    deleteTask(taskId){
        const sql = `DELETE FROM Tasks WHERE taskId = ${taskId}`

        return queryDatabase(sql)
    }
}



module.exports = {
   databaseService
}