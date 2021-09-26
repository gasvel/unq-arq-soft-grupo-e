import {Schema, model} from 'mongoose'
import User from '../Users/User'

const productSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    descripcion:{
        type: String,
        trim: true
    },
    valor:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('Product', productSchema);