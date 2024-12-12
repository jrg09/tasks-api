const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const TaskScheme = new Schema(
    {
        name: {
            type: String,
        },
        done: {
            type: Boolean,
            default: false,
        },
        due: {
            type: Date,
        },
        completed: {
            type: Date,
        },
        priority: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

//create model for todo
module.exports = mongoose.model("tasks", TaskScheme);
