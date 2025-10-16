const Task = require("../models/task.model");

async function findAll(req, res) {
  try {
    const data = await Task.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: "Cannot connect to database."});
  }
}

async function findById(req, res) {
  try {
    const data = await Task.findById(req.params.id);
    if(!data) return res.status(404).json({message: "Cannot find task."});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: "Cannot connect to database."});
  }
}

async function addTask(req, res) {
  try {
    if (!req.body.title) 
        return res.status(400).json({ message: "Title cannot be empty." });
    const newTask = await Task.addTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({message: "Cannot connect to database."});
  }
}

async function updateTask(req, res) {
  try {
    const updated = await Task.updateTask(req.params.id, req.body);
    return updated ? res.status(200).json(updated) : res.status(404).json({ message: "Cannot find task" });
  } catch (error) {
    res.status(500).json({message: "Cannot connect to database."});
  }
}

async function deleteTask(req, res) {
  try {
    const deleted = await Task.deleteTask(req.params.id);
    return deleted ? res.status(204).send() : res.status(404).json({ message: "Cannot find task" });
  } catch (error) {
    res.status(500).json({message: "Cannot connect to database."});
  }
}

module.exports = {
  findAll,
  findById,
  addTask,
  updateTask,
  deleteTask,
};
