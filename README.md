Simple TODO LIST
FROM RUBY GARAGE

node.js + mysql + ajax

SQL Tasks

1. SELECT DISTINCT * FROM tasks ORDER BY Title

2. SELECT  COUNT(tasks.Title) 
FROM projects JOIN tasks ON tasks.project_id = projects.id 
GROUP BY projects.id DESC

3. SELECT projects.Name, COUNT(tasks.Title) 
FROM projects JOIN tasks ON tasks.project_id = projects.id 
GROUP BY projects.Name ASC

4. SELECT projects.Name, tasks.Title 
FROM projects JOIN tasks ON tasks.project_id = projects.id 
WHERE projects.Name LIKE 'С%'

5. SELECT projects.Name, COUNT(tasks.tasksID) 
FROM tasks RIGHT JOIN projects ON tasks.project_id = projects.id 
WHERE projects.Name LIKE '%а%' GROUP BY projects.id

6. SELECT tasksID, Title 
FROM tasks WHERE Title IN (SELECT Title FROM tasks GROUP BY Title HAVING COUNT(*) >1) ORDER BY Title

7. SELECT tasks.Title 
FROM tasks RIGHT JOIN projects ON tasks.project_id = projects.id 
WHERE projects.Name = 'Garage' GROUP BY tasks.Title, tasks.status HAVING COUNT(tasks.tasksID) > 1 
ORDER BY COUNT(tasks.tasksID)

8. SELECT projects.Name
FROM tasks JOIN projects
ON tasks.project_id = projects.id
WHERE tasks.status = 'true'
GROUP BY projects.id HAVING COUNT(tasks.tasksID) >10
ORDER BY projects.id
