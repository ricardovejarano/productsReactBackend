import mongoose, { Schema, Document } from 'mongoose';

export interface IProductResponse {
    _id: string;
    name: string;
    price: number;
    description: string;
    disStock: number;
    idCategory: string;
}

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    disStock: number;
    idCategory: string;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    disStock: { type: Number, required: true },
    idCategory: { type: String, required: true }
});

export default mongoose.model<IProduct>('product', userSchema);