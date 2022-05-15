const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'Content 未填寫']
        },
        image: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        name: {
            type: String,
            required: [true, '貼文姓名未填寫']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'UserId 未填寫']
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    {
        versionKey: false
    }
);
const Post = mongoose.model('Post', postSchema);

module.exports = Post