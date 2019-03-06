import { Schema, model } from "mongoose";
// Can use @interface for type-checking but I'm too lazy to write...
// TODO: Type-checking if it is needed (future update)

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: "Enter title"
  },
  slug: {
    type: String,
    required: "Enter content"
  },
  total: {
    type: Number
  },
  icon: {
    type: String
  },
  color: {
    type: String
  }
});

export default model("Category", CategorySchema, "Categories");
