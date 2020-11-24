import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    idproduct: number;
    name: string;
    type: string;
    price: number;
    description: string;
    disstock: number;
    idcategory: number;

}

const userSchema: Schema = new Schema({
    idproduct: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    disstock: { type: Number, required: true },
    idcategory: { type: Number, required: true }
});

export default mongoose.model<IProduct>('Product', userSchema);