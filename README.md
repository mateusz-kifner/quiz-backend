# Quiz App Backend

Projek Quiz app Backend (Alpha)
Repozytorium front-end-u można znależć [Tutaj](https://github.com/kifner-mateusz/quiz)

Nazwa ścieżki | url | metoda | dane
--- | --- | --- | ---
users | /users/ | GET |``` ```
users | /users/:userId | GET |``` ```
users | /users/singin | POST | ``` { "login":"", "password":"" }```
users | /users/singup | POST | ``` { "login":"", "password":"", "email":"", "permission":"user" }```
users | /users/:userId | PATCH | ``` [ { "key":"", "value":"" }, { "key":"", "value":"" } ]```
users | /users/:userId | DELETE |``` ```
--- | --- | ---
quizzes | /quizzes/ | GET |``` ```
quizzes | /quizzes/:quizId | GET |``` ```
quizzes | /quizzes/ | POST | ``` { "title":"", "description":"" }```
quizzes | /quizzes/:quizId | DELETE |``` ```
quizzes | /quizzes/:quizId | PATCH |``` [ { "key":"", "value":"" }, {" key":"", "value":"" } ]```



