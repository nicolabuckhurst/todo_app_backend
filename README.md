# Todo_app_backend API

### GET /tasks
Returns an array of Task objects
#### Parameters
None
#### Response
```
Status: 200

[ 
Task {
      taskDescription: 'feed the cat',
      userId: 1,
      taskCompleted: 0,
      taskId: 1213
      },
Task {
      taskDescription: 'pick up groceries',
      userId: 1,
      taskCompleted: 0,
      taskId: 1214 
      },
Task {
      taskDescription: 'cook dinner',
      userId: 2,
      taskCompleted: 0,
      taskId: 1215
      } 
]

```

### GET /tasks/:userId
Returns an Array of Tasks object with userId ..this array will only contain a single task
#### Parameters
None
#### Response
```
Status: 200

 [ 
 Task {
        taskDescription: 'feed the cat',
        userId: 1,
        taskCompleted: 0,
        taskId: 1235 
       },
 Task {
       taskDescription: 'pick up groceries',
       userId: 1,
       taskCompleted: 0,
       taskId: 1236 } 
]
```

### GET /tasks/:taskId
Returns a Task object with taskId 
#### Parameters
None
#### Response
```
Status:200

Task {
        taskDescription: 'feed the cat',
        userId: 1,
        taskCompleted: 0,
        taskId: 1238 }
```

### POST /tasks
Adds a new task
#### Parameters
The Accept Header should be set to 'application/JSON'
The Body of the post request should be a JSON object with the following **required** parameters

| Parameter | Value |
| ----------|-------- |
| taskDescription | "a string contain the task description" |
| userID | the userId as a number |
| taskCompleted | a 0 or 1 to flag whether task is completed |

example: {"taskDescription":"feed the cat", "userId": 1, "taskCompleted": 0}

#### Response
```
Status: 200
{message: "task added"}
```

### PUT /tasks/taskId
Updates a task at taskId
#### Parameters
The Accept Header should be set to 'application/JSON'
The Body of the post request should be a JSON object with the following **optional** parameters

| Parameter | Value |
| ----------|-------- |
| taskDescription | "a string contain the task description" |
| taskCompleted | a 0 or 1 to flag whether task is completed |

example: {"taskCompleted": 1}

#### Response
```
Status: 200
{message: "task updated"}
```
### DELETE /tasks/taskId
deletes task with taskId
#### Parameters
None

#### Response
```
Status: 200
{message: "task deleted"}
```

