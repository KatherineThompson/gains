# REST Exercise

This exercise will help you learn about using a [RESTful API](http://stackoverflow.com/questions/671118/what-exactly-is-restful-programming). You start with a simple AngularJS app. It is currently storing all its data in the browser. Update it to use the server instead.

## Usage

`npm install` to get started.

`npm test` to run the tests.

`npm start` to run the server. Edit the files in `/static`.

## Server API
The following methods are available:

```
# GET Items. Returns a list of all items.
λ curl -s localhost:3000/api/items | json
[
  {
    "name": "Item 1",
    "createdAt": 1472931867258,
    "id": 0
  },
  {
    "name": "Item 2",
    "createdAt": "2016-09-03T19:52:47.258Z",
    "id": 1
  },
  {
    "name": "new item",
    "createdAt": "2016-09-03T19:52:56.026Z",
    "id": 2
  }
]

# POST Item. Creates a new item. Returns the newly created item.
λ curl -s localhost:3000/api/item -X POST -d '{"name": "new item"}' -H "Content-Type: application/json"  | json
{
  "name": "new item",
  "createdAt": "2016-09-03T20:02:11.822Z",
  "id": 3
}

# DELETE Item. Deletes an item that already exists.
# Return a list containing the deleted item. Return an empty list if the specified id is not found.
λ curl -s localhost:3000/api/item -X DELETE -d '{"id": 3}' -H "Content-Type: application/json"  | json
[
  {
    "name": "new item",
    "createdAt": "2016-09-03T20:02:11.822Z",
    "id": 3
  }
]
  
# PUT Item. Edit an item's name. Return the newly renamed item.
λ curl -s localhost:3000/api/item -X PUT -d '{"id": 1, "name": "new name"}' -H "Content-Type: application/json"  | json
{
  "name": "new name",
  "createdAt": "2016-09-03T19:52:47.258Z",
  "id": 1
}
  
```
 