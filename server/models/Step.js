const { model, Schema } = require('mongoose')

const stepSchema = new Schema(
    {
        sequence: {
            type: Number,
            required: [true, 'You must number your steps']
        },
        content: {
            type: String
        },
        notes: [{
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }],
        recipeId: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        status: {
            type: String,
            enum: ['temporary', 'saved'],
            default: 'temporary',
            required: [true, 'You need to put a status on the steps']
        }
    }
)

const Step = model('Step', stepSchema)

module.exports = Step