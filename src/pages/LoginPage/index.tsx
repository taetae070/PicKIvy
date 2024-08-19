import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface LoginModalProps {
    onClose: () => void; // 모달 닫는 함수
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSocialLogin = (provider: string) => {
        // 추후 로그인 처리 로직 추가
        console.log(`Logging in with ${provider}`);
    };

    const handleCloseClick = () => {
        navigate('/'); // URL을 원래 경로로 변경
        onClose(); // 모달을 닫음
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={handleCloseClick}>×</CloseButton>
                <Header>나의 선택 기록하기<br />우리 함께 해봐요</Header>
                <SocialButtons>
                    <SocialButton onClick={() => handleSocialLogin('google')}>
                        <img src="path/to/google-logo.png" alt="Google Logo" />
                        <span>start with google</span>
                    </SocialButton>
                    <SocialButton onClick={() => handleSocialLogin('naver')}>
                        <img src="path/to/naver-logo.png" alt="Naver Logo" />
                        <span>start with naver</span>
                    </SocialButton>
                    <SocialButton onClick={() => handleSocialLogin('kakao')}>
                        <img src="path/to/kakao-logo.png" alt="Kakao Logo" />
                        <span>start with kakao</span>
                    </SocialButton>
                </SocialButtons>
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

// Styled-components

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 37.5rem;
    height: 33.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    border: 3px solid #91BED7;
    border-radius: 14px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);

`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

const Header = styled.h2`
    margin-bottom: 20px;
    font-size: 18px;
`;

const SocialButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`;

const SocialButton = styled.button`
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    background-color: white;
    font-size: 14px;
    img {
        margin-right: 10px;
        width: 24px;
        height: 24px;
    }
`;

const Footer = styled.div`
    margin-top: 20px;
    font-size: 14px;
`;

const FooterLink = styled.span`
    cursor: pointer;
    text-decoration: underline;
`;

const Notice = styled.p`
    margin-top: 10px;
    font-size: 12px;
    color: #888;
`;
