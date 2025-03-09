const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    pid: {
        type: Number,
        default: 0,
      },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
  });

const UserModel = mongoose.model("userdata", UserSchema);
module.exports = UserModel;