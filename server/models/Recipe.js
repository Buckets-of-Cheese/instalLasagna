const { model, Schema } = require('mongoose')

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: { type: String },
        environment: {
            type: String,
            enum: ['Mac OS','Windows','Linux','iOS', 'Android', 'Other'],
            default: 'Other'
        },
        creatorID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        steps: [{
            type: Schema.Types.ObjectId,
            ref: 'Steps'
        }],
        private: {
            type: Boolean,
            default: false
        }
    }
)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe