import {Schema, model} from 'mongoose'
import User from '../Users/User'

const wrapperProductSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    valor:{
        type: Number,
        required: true,
        min: [1, 'Minimum value is 1.']
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoria:{
        type: String,
        required: true,
        enum:{
            values: ['Vehiculos', 'Agro', 'Alimentos', 'Mascotas', 'Colleciones', 'Arte', 'Tecnologia', 'Deportes', 'Inmuebles', 'Vestimenta'],
            message: 'Category is not supported'
        }
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('WrapperProduct', wrapperProductSchema);