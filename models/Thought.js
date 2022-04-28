const { Schema, model } = require('mongoose');
const User = require('./User');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: { String, minlength: 1, maxlength: 280 },
            required: true,
        },
        /*Date
        Set default value to the current timestamp
        Use a getter method to format the timestamp on query*/ 
        createdAt: {
            timestamps: true,
        },
        username: {
            type: String,
            required: true,
            postedBy: User,
        },
        reactions: {
        [reactionSchema],

        reactions: [{ type: Schema.Types.ObjectId, ref: 'reactions' }]

        },
    },
    {
        toJSON: {
        getters: true,
      },
    }
)

/*Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.*/ 

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

onunhandledrejection.exports = Thought;