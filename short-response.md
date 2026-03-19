# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**: The aspects that make the Todo Tracker API restful are: the endpoint URLs indicate resources, not actions. This indicates to the user what kind of data they can expect to process. It has a clear usage of HTTP methods. This will help the user decide the action they can perform (e.g. `GET`, `POST`). Status codes provide the request result information. For instance, the server sends back a **200** when the data was successfully retrieved or **201** when a new piece of data was successfully created. And the endpoints follow a clear hierarchy of resources, using IDs to get specific resources (e.g. `api/todos/:id`).

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**: Having data logic and request/response logic in a single file creates a tight file coupling or **code monolith**. This makes the application hard to maintain, organize, and scale as everything lives in one file. By having a model and a controller enables **separation of concerns** and makes adding more logic/features easier to target for scalability, debugging, and organizing.

For example, without separation of concerns, changing the logic that updates the todos means digging through the request/response logic to find the relevant lines to change. With a model, we only need to check one file.

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**: 
1. The `handleTodosListClick` checks if the `toggle-btn` was pressed in the `frontend/src/main.js` file.
2. `handleTodosListClick` calls the `updateTodo` function then it goes to `frontend/src/fetch-helpers.js`.
3. The frontend's `updateTodo` method sends a `PATCH` request to the server's endpoint `/api/todos/:id` in the `server/index.js` file.
4. The middleware intercepts HTTP requests and directs them to the next middleware or respective controller in the `server/controllers/todoControllers.js` file.
5. The controllers' `updateTodo` reads the response and calls the `update` method from the `server/model/todoModel.js` file.
6. The `update` method looks for the todo task with the specific id extracted from the route parameters, updates `isDone` to `true` or `false`, and returns the updated value to the controllers' `updateTodo` method.
7. Lastly, the controller sends the response back to the client's frontend and renders the data to the user.

---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:
Line 1 belongs to the controller because it handles the request logic from the client.
Line 2 belongs to the controller because the logic handles the response validation.
Line 3 belongs to the model because it's dealing with data directly. This is logic handled by the "database"/model.
Line 4 belongs to the model because it is handling data tied to the "database".
Line 5 belongs to the controller because it's sending a server response to the client communicating the status code and the data.
