import { Schema, model } from 'mongoose';
// Can use @interface for type-checking but I'm too lazy to write...
// TODO: Type-checking if it is needed (future update)

const ArticleSchema: Schema = new Schema({
    title: {
        type: String,
        required: 'Enter title'
    },
    content: {
        type: String,
        required: 'Enter content'
    },
    categories: {
        type: String            
    },
    created: {
        type: Date,
        // default key is a surgar syntax but this is not the best choice for performance
        default: Date.now
    },
    modify: {
      type: Date,
      default: Date.now
    }
});

export default model('Article', ArticleSchema, "Articles");