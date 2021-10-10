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
    },
    photo:{
        type: Buffer,
        contentType: String
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

export default model('Product', productSchema);