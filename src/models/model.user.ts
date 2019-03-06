import { Schema, model } from "mongoose";
// Can use @interface for type-checking but I'm too lazy to write...
// TODO: Type-checking if it is needed (future update)

const CategorySchema: Schema = new Schema({
  username: {
    type: String,
    required: "Enter title"
  },
  email: {
    type: String,
    required: "Enter content"
  },
  password: {
    type: String
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

export default model("Category", CategorySchema, "Categories");
