Zombie Translator API
===

## GET /zombify

### Resource URL

  `http://localhost:3000/zombify`

### Parameters

- q:
  - message to be translated
  - limited to 1000 characters
  - required

### Example Request

  `http://localhost:3000/zombify?q=test`

Result:
  
  ```
  {
    "message": "trrst"
  }
  ``` 

---

## GET /unzombify

### Resource URL

  `http://localhost:3000/unzombify`

### Parameters

- q:
  - message to be translated
  - limited to 1000 characters
  - required

### Example Request

  `http://localhost:3000/unzombify?q=trrstrrrh`

Result:
  
  ```
  {
    "message": "tester"
  }
  ``` 