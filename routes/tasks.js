//rutas de host + /api/encuestas
const { Router } = require("express");
const { getTasks, createTask, updateTask, toggleTask, deleteTask } = require("../controllers/tasks");
const { validatorCreateTask } = require("../validators/tasks");

const router = Router();

router.get("/", getTasks);
router.post("/", validatorCreateTask, createTask);
router.put("/:id", updateTask);
router.patch("/:id", toggleTask);
router.delete("/:id", deleteTask);

module.exports = router;
