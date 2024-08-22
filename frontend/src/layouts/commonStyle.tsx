import styled from "styled-components";
import './commonStyle.module.css';

interface FlexCenterProps {
  height?: string;
  width?: string;
}
 const FlexCenter = styled.form<FlexCenterProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.height || '100vh'};
  width: ${(props) => props.width || '100vw'};
`;

 const Flex = styled.div`  
  display: flex;
`;

//로그인, 회원가입 버튼
 const BtnSmall = styled.button`
  background-color: var(--B);
  color: white;
  text-align: center;
  padding: 6px 16px;
  border: 1px solid var(--BtnStroke); /* border-color 대신 border로 수정 */
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

//login, join modal
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

const CloseBtn = styled.button`
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

const SocialBtnAll = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
margin-bottom: 20px;
`;

const SocialBtn = styled.button`
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



export { BtnSmall, Flex, FlexCenter, ModalOverlay, ModalContent, SocialBtnAll, SocialBtn, CloseBtn, Header, Footer, FooterLink, Notice };