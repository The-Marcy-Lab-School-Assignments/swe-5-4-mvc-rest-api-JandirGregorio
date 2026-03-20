const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');
const todoControllers = require('./controllers/todoControllers.js');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.json());
app.use(express.static(pathToFrontend));

// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)
const serve404 = (req, res) => {
    res.status(404).send({ message: `Error: Not found ${req.originalUrl}`});
};

/* ENPOINTS */

app.get('/api/todos', todoControllers.listTodos);
app.get('/api/todos/:id', todoControllers.findTodo);
app.post('/api/todos', todoControllers.createTodo);
app.patch('/api/todos/:id', todoControllers.updateTodo);
app.delete('/api/todos/:id', todoControllers.deleteTodo);

app.use(serve404);

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
