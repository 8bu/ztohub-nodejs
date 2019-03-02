import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ArticleSchema = new Schema({
    title: {
        type: String,
        required: 'Enter title'
    },
    content: {
        type: String,
        required: 'Enter content'
    },
    tags: {
        type: String            
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});