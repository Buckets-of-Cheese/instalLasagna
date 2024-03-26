const { model, Schema } = require('mongoose')

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: { type: String },
        // in the future, add an environment model so people can store custom environments
        environment: {
            type: String,
            enum: ['Mac OS','Windows','Linux','iOS', 'Android', 'Custom','Other'],
            default: 'Other'
        },
        creatorID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        steps: [{
            type: Schema.Types.ObjectId,
            ref: 'Step'
        }],
        private: {
            type: Boolean,
            default: false
        }
    }
)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe