const admin = require("../config");
const db = admin.firestore();
module.exports = db;
const collection = db.collection("tasks");

async function findAll() {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
}

async function findById(id) {
    const task = await collection.doc(id).get();
    if(!task) return null;
    return {id: task.id, ...task.data()};
}

async function addTask(data) {
  const createdTask = await collection.add(data);
  return {id: createdTask.id, ...data};
}

async function updateTask(id, data) {
  await collection.doc(id).update(data);
  return this.findById(id);
}

async function deleteTask(id) {
  await collection.doc(id).delete();
  return { id };
}

module.exports = {
  findAll,
  findById,
  addTask,
  updateTask,
  deleteTask,
};
