const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalMongoose = require("passport-local-mongoose");
const async = require("async");

const UserSchema = new Schema({
  date_of_birth: { type: Date }
});

UserSchema.virtual("age").get(function() {
  //   TODO
  return 99;
});

UserSchema.plugin(passportlocalMongoose);

module.exports = mongoose.model("User", UserSchema);
// const DefaultUser = mongoose.model("User", UserSchema);
// (async () => {
//   const testUser = new DefaultUser({ username: "albert" });
//   await testUser.setPassword("password");
//   await testUser.save();
//   const { user } = await DefaultUser.authenticate()("albert", "password");
// })();
