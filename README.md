Simple TODO LIST
FROM RUBY GARAGE

node.js + mysql + ajax

SQL Tasks

1. SELECT DISTINCT * FROM tasks ORDER BY Title ASC
2. SELECT  COUNT(tasks.Title) FROM projects JOIN tasks ON tasks.project_id = projects.id GROUP BY projects.id DESC
3. SELECT projects.Name, COUNT(tasks.Title) FROM projects JOIN tasks ON tasks.project_id = projects.id GROUP BY projects.Name ASC
4. SELECT projects.Name, tasks.Title FROM projects JOIN tasks ON tasks.project_id = projects.id WHERE projects.Name LIKE 'С%'
5. SELECT * FROM tasks ORDER BY Title ASC
