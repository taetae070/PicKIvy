import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import userRoutes from './routes/userRoutes';  // MongoDB 사용자 관련 경로
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5001;

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err);
  });

// User 타입 정의 (JSON 데이터 관리용)
interface User {
  id: number;
  name: string;
  email: string;
  notes: string;
}

// 데이터 파일 경로 설정 (JSON 데이터로 사용자 관리)
const dataFilePath = path.join(__dirname, '../data.json');

// 데이터 로드 함수 (JSON 파일에서 사용자 데이터 로드)
const loadData = (): User[] => {
  if (!fs.existsSync(dataFilePath)) {
    return []; // 파일이 없을 경우 빈 배열 반환
  }
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data) as User[];
};

// 데이터 저장 함수 (JSON 파일에 사용자 데이터 저장)
const saveData = (data: User[]): void => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 간단한 API 엔드포인트 (테스트용)
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the TypeScript backend!' });
});

// JSON 파일 기반 사용자 API

// 모든 사용자 조회 (JSON 파일 사용)
app.get('/api/json/users', (req: Request, res: Response) => {
  const users = loadData();
  res.json(users);
});

// 특정 사용자 조회 (ID 기반, JSON 파일 사용)
app.get('/api/json/users/:id', (req: Request, res: Response) => {
  const users = loadData();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 사용자 생성 (POST 요청, JSON 파일에 저장)
app.post('/api/json/users', (req: Request, res: Response) => {
  const users = loadData();
  const newUser: User = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    email: req.body.email,
    notes: req.body.note
  };
  users.push(newUser);
  saveData(users);
  res.status(201).json(newUser);
});

// 사용자 수정 (PUT 요청, ID 기반 수정, JSON 파일 사용)
app.put('/api/json/users/:id', (req: Request, res: Response) => {
  const users = loadData();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { id: users[index].id, ...req.body };
    saveData(users);
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 사용자 삭제 (DELETE 요청, ID 기반 삭제, JSON 파일 사용)
app.delete('/api/json/users/:id', (req: Request, res: Response) => {
  let users = loadData();
  const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
  if (users.length === newUsers.length) {
    return res.status(404).json({ message: 'User not found' });
  }
  saveData(newUsers);
  res.json({ message: 'User deleted' });
});

// MongoDB 관련 사용자 API는 userRoutes에서 처리
app.use('/api/users', userRoutes);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
