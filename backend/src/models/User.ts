import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types/User';  // types 폴더에 있는 인터페이스를 사용

// User 스키마 정의
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  note: { type: String }
});

// Mongoose 모델로 변환하여 내보내기
export default mongoose.model<IUser>('User', UserSchema);
