"use strict";
// __importDefault 함수: CommonJS와 ES 모듈 시스템 간의 호환성을 위해 사용, TypeScript가 import를 사용할 때 ES 모듈을 자동으로 변환하기 위한 역할
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidator_1 = require("../validators/userValidator");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const dataFilePath = path_1.default.join(__dirname, '../../data.json');

// 데이터 로드 함수
const loadData = () => {
    const data = fs_1.default.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
};

// 데이터 저장 함수
const saveData = (data) => {
    fs_1.default.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// 사용자 생성
router.post('/', (req, res) => {
    // 입력 유효성 검사
    const { error } = userValidator_1.userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const users = loadData();

    // 중복 확인
    const duplicateUser = users.some((user) => user.name === req.body.name || user.email === req.body.email);
    if (duplicateUser) {
        return res.status(400).json({ message: '이미 존재하는 유저네임 또는 이메일입니다.' });
    }

    // 새로운 사용자 생성
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);
    saveData(users);
    res.status(201).json(newUser);
});

exports.default = router;
