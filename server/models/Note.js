const { model, Schema } = require('mongoose')

const noteSchema = new Schema(
    {
        content: {
            type: String
        },
        stepId: {
            type: Schema.Types.ObjectId,
            ref: 'Step'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['temporary', 'saved'],
            default: 'temporary',
            required: [true, 'You need to put a status on the steps']
        }
    }
)

const Note = model('Note', noteSchema)

module.exports = Note