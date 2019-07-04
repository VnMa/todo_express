const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  date_of_birth: { type: Date }
});

UserSchema.virtual("age").get(function() {
  //   TODO
  return 99;
});

module.exports = mongoose.model("User", UserSchema);
