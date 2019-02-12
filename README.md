# Todo_app_backend API

## End-points
### GET /tasks
Returns an array of Task objects
#### Parameters
None
#### Response
```
Status: 200

[ Task {
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

### GET /tasks/:taskId
Returns an Array of Tasks object with taskId ..this array will only contain a single task
#### Parameters
None
#### Response
```

```
