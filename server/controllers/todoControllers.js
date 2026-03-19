const todoModel = require('../models/todoModel.js');

module.exports.createTodo = (req, res) => {
  const { task } = req.body;

  if (typeof task !== 'string' || !String(task).trim()) {
    return res.status(400).send({ message: 'Invalid Task'});
  }

  const newPet = todoModel.create(String(task).trim());
  res.status(201).send(newPet);

};

module.exports.listTodos = (req, res) => {
  const todos = todoModel.list();
  res.send(todos);
};

module.exports.findTodo = (req, res) => {
  const { id } = req.params;
  const todo = todoModel.find(Number(id));

  if (!todo) {
    return res.status(404).send({ message: `No todo with the id ${id}`});
  }
  res.send(todo);
};

module.exports.updateTodo = (req, res) => {
  const { isDone } = req.body;
  
  if (typeof isDone !== 'boolean') {
    return res.status(400).send({ message: 'Invalid Status'});
  }

  const { id } = req.params;
  const updatedTodo = todoModel.update(Number(id), { isDone });

  if (!updatedTodo) {
    return res.status(404).send({ message: `No to-do with the id ${id}`});
  }

  res.send(updatedTodo);
};

module.exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const deletedTodo = todoModel.destroy(Number(id));

  if (!deletedTodo) {
    return res.status(404).send({ message: `No to-do with the id ${id}`});
  }

  res.sendStatus(204);
};
