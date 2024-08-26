import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import userRoutes from './routes/users';

const app = express();
const port = process.env.PORT || 5001;

// User 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  notes: string;
}

// 데이터 파일 경로 설정
const dataFilePath = path.join(__dirname, 'data.json');

// 데이터 로드 함수
const loadData = (): User[] => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data) as User[];
};

// 데이터 저장 함수
const saveData = (data: User[]): void => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.use(cors());
app.use(express.json());

// 간단한 API 엔드포인트
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the TypeScript backend!' });
});

// 모든 사용자 조회
app.get('/api/users', (req: Request, res: Response) => {
  const users = loadData();
  res.json(users);
});

// 특정 사용자 조회
app.get('/api/users/:id', (req: Request, res: Response) => {
  const users = loadData();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 사용자 생성
app.post('/api/users', (req: Request, res: Response) => {
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

// 사용자 수정
app.put('/api/users/:id', (req: Request, res: Response) => {
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

// 사용자 삭제
app.delete('/api/users/:id', (req: Request, res: Response) => {
  let users = loadData();
  const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
  if (users.length === newUsers.length) {
    return res.status(404).json({ message: 'User not found' });
  }
  saveData(newUsers);
  res.json({ message: 'User deleted' });
});

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우트 설정
app.use('/api/users', userRoutes);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
