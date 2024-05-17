const mongoose = require('mongoose');

const exploredDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
  },{
      timestamps:true,
      collection:'exploredData',
      versionKey: false 
  });

  const exploredData = mongoose.model('exploredData', exploredDataSchema);

 module.exports = { exploredData};