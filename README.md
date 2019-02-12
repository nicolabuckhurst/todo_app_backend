# Todo_app_backend API

## End-points
### GET /tasks
Returns an array of Task objects
#### Parameters
None
#### Response
```
Status: 200
[ 
  RowDataPacket {
          taskId: 953,
          taskDescription: 'feed the cat',
          taskCompleted: 0,
          userId: 1 
  },
  RowDataPacket {
          taskId: 954,
          taskDescription: 'pick up groceries',
          taskCompleted: 0,
          userId: 1 
  },
  RowDataPacket {
          taskId: 955,
          taskDescription: 'cook dinner',
          taskCompleted: 0,
          userId: 2 
  } 
]

```

### 
