import mongoose, { Schema, Document } from 'mongoose';
import { IProduct, IProductResponse } from './product.model';

export interface ICategoryResponse {
    _id: string;
    idUser: string;
    name: string;
    description: string;
    products?: IProductResponse[];
}


export interface ICategory extends Document {
    idUser: string;
    name: string;
    description: string;
    products?: IProduct[];
}

const userSchema: Schema = new Schema({
    idUser: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
   
});

export default mongoose.model<ICategory>('category', userSchema);