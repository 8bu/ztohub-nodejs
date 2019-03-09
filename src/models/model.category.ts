import { Schema, model } from "mongoose";
import * as slug from "limax";
const beautifyUnique = require('mongoose-beautiful-unique-validation');
// Can use @interface for type-checking but I'm too lazy to write...
// TODO: Type-checking if it is needed (future update)

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: "Enter title"
  },
  slug: {
    type: String,
    unique: 'Slug can not be the same with other articles. Please change it.'
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

// Added beautifier error message
CategorySchema.plugin(beautifyUnique);

CategorySchema.pre("save", function(next) {
  this.slug = this.slug || slug(this.name);
  next();
});

export default model("Category", CategorySchema, "Categories");
