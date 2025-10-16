const admin = require("../config");
const db = admin.firestore();
module.exports = db;
const bcrypt = require('bcryptjs');

const collection = db.collection("users");

async function findById(id){
    const userFind = await collection.doc(id).get();
    if(!userFind) return null;
    return { id: userFind.id, ...userFind.data()};
}

async function findByUsername(username){
    const querySnapshot = await collection.where("username", "==", username).get();
    if(querySnapshot.empty) return null;
    const userDoc = querySnapshot.docs[0];
    return { id:userDoc.id, ...userDoc.data()};
}

async function createUser({username, password}) {
    const existingUser = await collection.where("username", "==", username).get();
    if(!existingUser.empty) return null;
    const hashedPass = await (bcrypt.hash(password, 10));
    const user = await collection.add({username, password: hashedPass});
    return { id: user.id, ...{username, password: hashedPass}};
}

module.exports = { findById, findByUsername, createUser };