import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    seller:{
        type: Boolean,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    razonSocial:{
        type: String,
        unique: true,
        trim: true
    },
    emailCorporativo:{
        type: String,
        unique: true,
        trim: true
    },
    photo:{
        type: Buffer,
        contentType: String
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('User', userSchema);