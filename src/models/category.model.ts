import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description: string;
   

}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
   
});

export default mongoose.model<ICategory>('category', userSchema);