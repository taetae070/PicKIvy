import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../types/User';
import { userSchema } from '../validators/userValidator';

const router = express.Router();

// router.post('/' : /다음이 최상위 접속
// 사용자 생성 (MongoDB)
router.post('/', async (req: Request, res: Response) => {
  console.log(req.body, '*')
  // res.status(500).json({ message: '사용자 생성에 실패했습니다.' });
  try {
    // 요청 본문 검증
    const value = await userSchema.validateAsync(req.body);
    const { username, email, password, passwordConfirm } = value;

    // 기존 사용자 확인
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
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

// 잘못된 메서드 요청에 대한 405 처리
router.all('/', (req: Request, res: Response) => {
  res.status(405).send('Method Not Allowed');
});

export default router;
