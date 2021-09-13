import {Schema, model} from 'mongoose'

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
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('Product', productSchema);