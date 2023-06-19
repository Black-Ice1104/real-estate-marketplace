// create database model in MongoDB
import {model, Schema, ObjectId} from 'mongoose';

const schema = new Schema(
    {
        username: {
            type: String,
            trim: true, // white space removed
            require: true, // must be provided
            unique: true, // each user has a different username
            lowercase: true, // saved in lowercase
        },
        name: {
            type: String,
            trim: true,
            default: "",
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            maxLength: 256,
        },
        address: { type: String, default: ""},
        company: { type: String, default: ""},
        phone: { type: String, default: ""},
        photo: {},
        role: {
            type: [String],
            default: ['Buyer'],
            enum: ["Buyer", "Seller", "Admin"],
        },
        enquiredProperties: [{type: ObjectId, ref: "Ad"}],
        wishlist: [{type: ObjectId, ref: "Ad"}],
        resetCode: { type: String, default: ""}, // allow users to log in after reset
    },
    {timestamps: true}
);

export default model('User', schema);