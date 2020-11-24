import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    iduser: string;
    name: string;
    description: string;
    
   

}

const userSchema: Schema = new Schema({
    iduser: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
   
});

export default mongoose.model<ICategory>('category', userSchema);