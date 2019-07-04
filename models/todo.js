const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  title: { type: String },
  content: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User", require: false }
});

module.exports = mongoose.model("Todo", TodoSchema);

// const TodoModel = mongoose.model("Todo", TodoSchema);
// const sample_todo = new TodoModel({
//   title: "oh yeah",
//   content: "awesome content is here"
// });

// sample_todo.save(function(err) {
//   if (err) console.warn("err: ", err);
//   else console.log("SUCESS");
// });
