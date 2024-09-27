import express, { Request, Response } from 'express'; //Express.js는 Node.js에서 서버를 쉽게 만들 수 있게 해주는 웹 프레임워크
import cors from 'cors'; // Cross-Origin Resource Sharing을 관리하는 미들웨어로, API가 다른 도메인에서 호출될 때 이를 허용하는 역할
import userRoutes from './routes/userRoutes';  // MongoDB 사용자 관련 경로
import mongoose from 'mongoose'; //MongoDB와 연결하고, 데이터를 스키마화하여 쉽게 다룰 수 있게 해주는 ODM(Object Data Modeling) 라이브러리

const app = express(); // Express 서버 인스턴스 생성 -> API를 정의하고 요청을 처리
const port = process.env.PORT || 5001;//서버가 실행될 포트를 설정

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err);
  });

// 미들웨어 설정
app.use(express.json()); //클라이언트에서 JSON 형식의 데이터를 보낼 때 이를 파싱
app.use(express.urlencoded({extended:false})); //URL-encoded 데이터를 파싱 (주로 HTML 폼 데이터를 처리할 때 사용, 파싱:데이터를 변환하는 과정)
app.use(cors()); //CORS 설정을 활성화하여, 외부에서 서버에 접근할 수 있도록 허용

// MongoDB 관련 사용자 API는 userRoutes에서 처리, /api/users에 접속할때userRoutes을 이용하겠다. 
app.use('/api/users', userRoutes);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;