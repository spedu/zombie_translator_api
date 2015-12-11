Zombie Translator API
===

API to translate to and from Zombie to English.

## Translation Guide

1. lower-case "r" at the end of words replaced with "rh".
2. an "a" or "A" by itself will be replaced with "hra".
3. the starts of sentences are capitalized (the "start of a sentence" is any occurance of ".!?", followed by a space, followed by a letter.)
4. "e" or "E" is replaced by "rr".
5. "i" or "I" is replaced by "rrRr".
6. "o" or "O" is replaced by "rrrRr".
7. "u" or "U" is replaced by "rrrrRr".
8. "r" or "R" is replaced by "RR"
9. "g" or "G" at beginning of words is replaced by "LLL"
10. Capitalization rule should be done first when translating from english to zombie and last when translating from zombie to english, and any other rules will be applied to the properly capitalized text


---

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
  
`{ "message": "trrst" }`

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
  
`{ "message": "tester" }`

---

## Errors

### 422 Unprocessible Entity

q parameter is not set

`{ "status": 422, "message": "q parameter undefined" }`

### 414 Response Status Code

Characters over 1000 characters in length

`{ "status": 414, "message": "request parameter over 1000 characters in length" }`

### 404 Response Status Code

Invalid route

`{ "status": 404, "message": "route not found" }`

---

## Dependencies

Nodemon

`npm install -g nodemon`

## How to run locally

* `npm install`
* `npm start`


 
