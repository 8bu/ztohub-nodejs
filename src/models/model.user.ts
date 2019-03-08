import { Schema, model } from "mongoose";
// Can use @interface for type-checking but I'm too lazy to write...
// TODO: Type-checking if it is needed (future update)

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: "username is missing"
  },
  email: {
    type: String,
    required: "email is missing"
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

export default model("User", UserSchema, "Users");
