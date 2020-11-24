import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    nickname: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
}

const userSchema: Schema = new Schema({
    nickname: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

export default mongoose.model<IUser>('users', userSchema);