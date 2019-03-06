import { Schema, model } from "mongoose";
import * as slug from "limax";
// Can use @interface for type-checking but I'm too lazy to write...
// TODO: Type-checking if it is needed (future update)

const ArticleSchema: Schema = new Schema({
  title: {
    type: String,
    required: "Enter title"
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: "Enter content"
  },
  categories: {
    type: String
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
// Generate slug before post
ArticleSchema.pre("save", function(next) {
  this.slug = slug(this.title);
  next();
});

export default model("Article", ArticleSchema, "Articles");
