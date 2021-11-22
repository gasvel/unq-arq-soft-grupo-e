import {Schema, model} from 'mongoose'
import WrapperProduct from '../WrapperProducts/WrapperProduct'
import Product from '../Products/Product'
import User from '../Users/User'

const salesSchema = new Schema({
    taxes:{
        type: Number,
        required: true,
        min: [1, 'Minimum value is 1.']
    },
    buyer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    wrapperProduct:{
        type: Schema.Types.ObjectId,
        ref: 'WrapperProduct'
    },
    formaPago:{
        type: String,
        required: true,
        enum:{
            values: ['Cash', 'Card', 'MercadoPago', 'Transferencia', 'Otros'],
            message: 'Category is not supported'
        }
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('Sale', salesSchema);