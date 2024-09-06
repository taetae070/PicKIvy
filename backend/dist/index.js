"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
// 데이터 파일 경로 설정
const dataFilePath = path_1.default.join(__dirname, 'data.json');
// 데이터 로드 함수
const loadData = () => {
    const data = fs_1.default.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
};
// 데이터 저장 함수
const saveData = (data) => {
    fs_1.default.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 간단한 API 엔드포인트
app.get('/api/users', (req, res) => {
    res.json({ message: 'Hello from the TypeScript backend!' });
});
// 모든 사용자 조회
app.get('/api/users', (req, res) => {
    const users = loadData();
    res.json(users);
});
// 특정 사용자 조회
app.get('/api/users/:id', (req, res) => {
    const users = loadData();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});
// 사용자 생성
app.post('/api/users', (req, res) => {
    const users = loadData();
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    saveData(users);
    res.status(201).json(newUser);
});
// 사용자 수정
app.put('/api/users/:id', (req, res) => {
    const users = loadData();
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        users[index] = Object.assign({ id: users[index].id }, req.body);
        saveData(users);
        res.json(users[index]);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});
// 사용자 삭제
app.delete('/api/users/:id', (req, res) => {
    let users = loadData();
    const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
    if (users.length === newUsers.length) {
        return res.status(404).json({ message: 'User not found' });
    }
    saveData(newUsers);
    res.json({ message: 'User deleted' });
});
// 미들웨어 설정
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 라우트 설정
app.use('/api/users', users_1.default);
// 서버 실행
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
