const { model, Schema } = require('mongoose')

const stepSchema = new Schema(
    {
        sequence: {
            type: Number,
            
        }
    }
)

const Step = model('Step', stepSchema)

module.exports = Step