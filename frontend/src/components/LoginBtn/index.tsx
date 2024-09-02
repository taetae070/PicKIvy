import React from 'react';
import { useNavigate } from 'react-router-dom';
import {BtnSmall} from 'src/layouts/commonStyle';

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
            <BtnSmall onClick={handleLoginClick} isLogin={true}>Login</BtnSmall>
        </div>
    )
}


export default LoginBtn;
