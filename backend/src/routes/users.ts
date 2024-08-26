import { Router, Request, Response } from 'express';
import  {userSchema}  from '../validators/userValidator';
import fs from 'fs';
import path from 'path';
import { User } from '../types';

const router = Router();
const dataFilePath = path.join(__dirname, '../../data.json');

// 데이터 로드 함수
const loadData = (): User[] => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data) as User[];
};

// 데이터 저장 함수
const saveData = (data: User[]): void => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// 사용자 생성
router.post('/', (req: Request, res: Response) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const users = loadData();
  const newUser: User = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    email: req.body.email,
    note: req.body.note
  };
  users.push(newUser);
  saveData(users);
  res.status(201).json(newUser);
});

export default router;
