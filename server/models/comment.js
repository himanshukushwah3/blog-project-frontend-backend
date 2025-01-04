
import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});


const Comment = mongoose.model('comment', CommentSchema);

export default Comment;
