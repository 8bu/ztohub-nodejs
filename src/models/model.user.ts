import { Schema, model } from "mongoose";
const bcrypt = require('bcrypt-nodejs');

const beautifyUnique = require('mongoose-beautiful-unique-validation');
// Can use @interface for type-checking but I'm too lazy to write...
// TODO: Type-checking if it is needed (future update)

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: "username is missing",
    unique: "Username exist"
  },
  email: {
    type: String,
    required: "email is missing",
    unique: "Email exist"
  },
  password: {
    type: String,
    required: "password is missing"
  },
  created: {
    type: Date,
    // default key is a surgar syntax but this is not the best choice for performance
    default: Date.now
  },
  modified: {
    type: Date,
    // default key is a surgar syntax but this is not the best choice for performance
    default: Date.now
  }
});
// Added beautifier error message
UserSchema.plugin(beautifyUnique);
UserSchema.pre("save", function(next) {
  const user = this;
  if(user.isModified('password') || user.isNew) {
    
  }
})
export default model("User", UserSchema, "Users");
