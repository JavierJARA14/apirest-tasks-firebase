const express = require("express");
const controller = require("../controllers/task.controllers");
//const { authenticate } =  require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", controller.addTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
