const Tasks = require("../models/tasks");

const getTasks = async (req, res) => {
    try {
        const data = await Tasks.find();
        res.json({ ok: true, tasks: data });
    } catch (error) {
        return res.status(501).json({ ok: false, msg: "Ocurrió un error al generar el listado de tasks." });
    }
};

const createTask = async (req, res) => {
    try {
        test();
        console.log(req.body);
        const task = req.body;
        console.log({ task });

        task.due = !!task.due ? task.due : null;
        task.priority = !!task.priority ? task.priority : "normal";
        task.category = !!task.category ? task.category : "Todos";
        task.completed = null;

        const createdTask = await Tasks.create(task);

        if (!createdTask) {
            return res.status(404).json({
                ok: false,
                message: "Problem creating Task",
                task: null,
            });
        }

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
        console.log(task);

        const update = await Tasks.findOneAndUpdate({ _id: req.params.id }, task);

        console.log(update);

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
    console.log(`toggleTask req.params.id: ${req.params.id}`);
    try {
        const task = await Tasks.findOne({ _id: req.params.id });

        if (!task) {
            return res.status(404).json({
                ok: false,
                message: "Task not completed",
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
    try {
        const deleteTask = await Tasks.findOneAndDelete({ _id: req.params.id });

        if (!deleteTask) {
            return res.status(404).json({
                ok: false,
                message: "Task not deleted",
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

const test = () => {
    console.log(`date: ${new Date().toISOString()}`);
};
module.exports = { getTasks, createTask, updateTask, toggleTask, deleteTask };
