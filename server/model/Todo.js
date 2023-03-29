const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const todoSchema = new Schema({
title: String,
comment: String,
createdAt: Date
});

const List = model('List', todoSchema);


module.exports = List;

