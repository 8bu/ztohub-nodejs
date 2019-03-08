import { Schema, model } from "mongoose";
import * as slug from "limax";
const beautifyUnique = require('mongoose-beautiful-unique-validation');
// Can use @interface for type-checking but I'm too lazy to write...
// TODO: Type-checking if it is needed (future update)

const ArticleSchema: Schema = new Schema({
  title: {
    type: String,
    required: "Enter title"
  },
  published: {
    type: Boolean,
    default: false
  },
  author_id: {
    type: String,
    require: "Username not found"
  },
  slug: {
    type: String,
    unique: 'Slug can not be the same with other articles. Please change it.'
  },
  content: {
    type: String,
    required: "Enter content"
  },
  categories: {
    type: Array
  },
  created: {
    type: Date,
    // default key is a surgar syntax but this is not the best choice for performance
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  }
});
// Added beautifier error message
ArticleSchema.plugin(beautifyUnique);
// Generate slug before post
ArticleSchema.pre("save", function(next) {
  this.slug = this.slug || slug(this.title);
  next();
});

export default model("Article", ArticleSchema, "Articles");
