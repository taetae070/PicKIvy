import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@layouts/commonStyle.module.css';
import {BtnSmall} from '@layouts/commonStyle';

interface LoginBtnProps {
    onLoginClick?: () => void;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ onLoginClick }) => {
    const navigate = useNavigate();

    const handleLoginClick = ()=>{
        navigate('/login');
        if (onLoginClick) {
            onLoginClick();
        }
    }
    return(
        <div>
            <BtnSmall onClick={handleLoginClick}>Login</BtnSmall>
        </div>
    )
}


export default LoginBtn;
