"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todolist = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        times: {
            type: String,
            required: true,

        },

    }
);
module.exports = mongoose.model("todolist", todolist);
