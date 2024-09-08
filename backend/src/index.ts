import express, { Request, Response } from 'express';
import cors from 'cors';
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

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// MongoDB 관련 사용자 API는 userRoutes에서 처리, /api/users에 접속할때userRoutes을 이용하겠다. 
app.use('/api/users', userRoutes);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;