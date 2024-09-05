import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: number;           // 고유 ID
  name: string;         // 유저 이름
  email: string;        // 이메일 주소
  password: string;     // 비밀번호 필드 추가
}


const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);