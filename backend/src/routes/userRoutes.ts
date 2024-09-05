import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/User'; 
import { userSchema } from '../validators/userValidator';

const router = express.Router();

// 사용자 생성 (MongoDB)
router.post('/', async (req: Request, res: Response) => {
 
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, email, password, passwordConfirm } = req.body;

  // 비밀번호 확인 일치 여부 체크
  if (password !== passwordConfirm) {
    return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
  }
  
  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 새로운 사용자 생성 및 저장
  try {
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: '사용자 생성에 실패했습니다.', error });
  }
});


// 잘못된 메서드 요청에 대한 405 처리 (예: GET 대신 POST 요청이 필요한 곳)
router.all('/', (req: Request, res: Response) => {
  res.status(405).send('Method Not Allowed');
});

export default router;
