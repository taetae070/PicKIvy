import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../types/User';
import { userSchema } from '../validators/userValidator';

const router = express.Router();

// 사용자 생성 (MongoDB)
router.post('/', async (req: Request, res: Response) => {
  try {
    // 요청 본문 검증
    const value = await userSchema.validateAsync(req.body);
    const { username, email, password, passwordConfirm } = value;

    // 기존 사용자 확인
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    const existingUsername = await UserModel.findOne({ username });
if (existingUsername) {
  return res.status(400).json({ message: '이미 존재하는 닉네임입니다.' });
}


    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 생성 및 저장
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      passwordConfirm
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    // Joi 유효성 검사 에러 처리
    if (error.isJoi) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // 기타 에러 처리
    res.status(500).json({ message: '사용자 생성에 실패했습니다.', error });
  }
  
 
});

// 사용자 목록 조회
router.get('/', async (req: Request, res: Response) => {
  try {
    // MongoDB에서 모든 사용자 정보를 가져옴
    const users = await UserModel.find();  // UserModel은 MongoDB 모델
    res.status(200).json(users);  // 사용자 목록을 응답
  } catch (error) {
    res.status(500).json({ message: '사용자 목록을 가져오는 데 실패했습니다.', error });
  }
});

// 잘못된 메서드 요청에 대한 405 처리
router.all('/', (req: Request, res: Response) => {
  res.status(405).send('Method Not Allowed');
});

export default router;
