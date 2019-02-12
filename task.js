class Task {
    constructor(description, userId, completed, taskId){
        this.taskDescription = description
        this.userId = userId
        this.taskCompleted = completed
        this.taskId = taskId
    }
}

module.exports = {
    Task: Task
}
