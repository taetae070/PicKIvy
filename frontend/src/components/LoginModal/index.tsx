import React from 'react';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
import { ModalOverlay, ModalContent, SocialBtnAll, SocialBtn, CloseBtn, Header, Footer, FooterLink, Notice } from '../../../layouts/commonStyle';

interface LoginModalProps {
    onClose: () => void; // 모달 닫는 함수
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {       
    const navigate = useNavigate(); 

    const handleCloseClick = () => {
        navigate('/'); 
        onClose();
    };
    const handleSocialLogin = (provider: string) => {
        // 추후 로그인 처리 로직 추가
        console.log(`Logging in with ${provider}`);
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseBtn onClick={handleCloseClick}>×</CloseBtn>
                <Header>나의 선택 기록하기<br />우리 함께 해봐요</Header>
                <SocialBtnAll>
                    <SocialBtn onClick={() => handleSocialLogin('google')}>
                        <img src="path/to/google-logo.png" alt="Google Logo" />
                        <span>start with google</span>
                    </SocialBtn>
                    <SocialBtn onClick={() => handleSocialLogin('naver')}>
                        <img src="path/to/naver-logo.png" alt="Naver Logo" />
                        <span>start with naver</span>
                    </SocialBtn>
                    <SocialBtn onClick={() => handleSocialLogin('kakao')}>
                        <img src="path/to/kakao-logo.png" alt="Kakao Logo" />
                        <span>start with kakao</span>
                    </SocialBtn>
                </SocialBtnAll>
                <Footer>
                    <FooterLink onClick={() => navigate('/login')}>login</FooterLink>
                    <span> | </span>
                    <FooterLink onClick={() => navigate('/join')}>join</FooterLink>
                </Footer>
                <Notice>회원가입 시 DecisionTree의 이용약관과 개인정보처리방침에 동의하게 됩니다.</Notice>
            </ModalContent>
        </ModalOverlay>
    );
};

export default LoginModal;

