import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {IUser} from '../types/User'
import User from '../models/User';  // Mongoose User 모델 사용
import { userSchema } from '../validators/userValidator';

const router = Router();

// 사용자 생성 라우트 (회원가입)
router.post('/', async (req: Request, res: Response) => {
  // 입력값 유효성 검사
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, note } = req.body;

  // 이메일 중복 확인
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 새로운 사용자 생성
  const newUser: IUser = new User({
    name,
    email,
    password: hashedPassword,  // 해싱된 비밀번호 저장
    note: note || ''           // note 필드는 선택 사항
  });

  // 사용자 저장
  try {
    await newUser.save();  // MongoDB에 저장
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: '사용자 생성에 실패했습니다.', error: err });
  }
});

export default router;
