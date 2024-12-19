const Tasks = require("../models/tasks");

const getTasks = async (req, res) => {
  const userId = req.headers["user-id"];
  console.log({ m: "getTasks", userId });

  try {
    const data = await Tasks.find({ userId }).select("-userId").sort({ type: 1, category: 1, done: 1, completed: 1 });
    res.json({ ok: true, total: data.length, tasks: data });
  } catch (error) {
    return res.status(501).json({ ok: false, msg: "Ocurrió un error al generar el listado de tasks." });
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    let task = req.body;
    console.log({ m: "createTask", userId, task });

    task.done = false;
    task.completed = null;
    task.userId = userId;
    task.due = !!task.due ? task.due : null;
    task.priority = !!task.priority ? task.priority : "normal";
    task.category = !!task.category ? task.category : "Todos";
    task.type = !!task.type ? task.type : "Personal";

    let createdTask = await Tasks.create(task);

    if (!createdTask) {
      return res.status(404).json({
        ok: false,
        message: "Problem creating Task",
        task: null,
      });
    }

    createdTask = createdTask.toObject();
    delete createdTask.userId;

    return res.status(200).json({
      ok: true,
      message: "Successfully created Task",
      task: createdTask,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = req.body;
    console.log({ m: "updateTask", task });

    const update = await Tasks.findOneAndUpdate({ _id: req.params.id }, task);

    if (!update) {
      return res.status(404).json({
        ok: false,
        message: "Not successfully updated",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Task successfully updated",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

const toggleTask = async (req, res) => {
  console.log({ m: "toggleTask", id: req.params.id });

  try {
    const task = await Tasks.findOne({ _id: req.params.id });

    if (!task) {
      return res.status(404).json({
        ok: false,
        message: "Task not found",
      });
    }

    task.done = !task.done;
    task.completed = task.done ? new Date() : null;

    await task.save();

    return res.status(200).json({
      ok: true,
      message: "Task successfully toggled",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  console.log({ m: "deleteTask", id: req.params.id });

  try {
    const deleteTask = await Tasks.findOneAndDelete({ _id: req.params.id });

    if (!deleteTask) {
      return res.status(404).json({
        ok: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Task successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = { getTasks, createTask, updateTask, toggleTask, deleteTask };
