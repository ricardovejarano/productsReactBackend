import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    type: string;
    price: number;
    description: string;
    disstock: number;

}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    disstock: { type: Number, required: true }
});

export default mongoose.model<IProduct>('Product', userSchema);