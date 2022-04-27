import mongoose from 'mongoose'

const CompletedSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        sex:{ type: Number,enum: [0,1],required: true },
        phone: { type: String, required: true },
    },
    { collection: 'completed' }
)

// CompletedSchema.index({ slug: 1, userid: 1 }, { unique: true })

export const UserForm = mongoose.model('user', CompletedSchema)
