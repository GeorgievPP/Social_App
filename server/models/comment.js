import mongoose from 'mongoose';

const schema = mongoose.Schema({
    description: { type: String, required: [true, 'Description is required!'], maxlength: [1024, 'Maximum description length is 1024!'] },
    createdAt: { type: Date, default: Date.now },
    author: { type: String, required: true },
    jimHelper: { type: String, required: true },
    avatar: { type: String },
    post: { type: String, required: true },
});


const Comment = mongoose.model('Comment', schema);
export default Comment;