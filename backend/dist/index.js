"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// CORS 설정
app.use((0, cors_1.default)());
// JSON 데이터 처리
app.use(express_1.default.json());
// 간단한 API 엔드포인트
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the TypeScript backend!' });
});
// 서버 실행
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
