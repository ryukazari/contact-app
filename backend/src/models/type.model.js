import { Schema, model } from 'mongoose';

const typeSchema = new Schema({
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

export default model('Type', typeSchema);