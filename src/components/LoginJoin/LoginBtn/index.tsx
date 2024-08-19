import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../layouts/commonStyle.module.css';
import '../../../layouts/commonStyle';
import {BtnSmall} from '../../../layouts/commonStyle';

interface LoginBtnProps {
    onLoginClick?: () => void;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ onLoginClick }) => {
    const navigate = useNavigate();

    const handleLoginClick = ()=>{
        navigate('/login');
        if (onLoginClick) {
            onLoginClick(); // 부모 컴포넌트에서 전달된 함수 호출 (모달을 열도록 함)
        }
    }
    return(
        <div>
            <BtnSmall onClick={handleLoginClick}>Login</BtnSmall>
        </div>
    )
}


export default LoginBtn;
