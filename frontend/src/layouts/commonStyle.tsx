import styled, { createGlobalStyle } from "styled-components";
import background from "src/img/house.BG.png";

const RootStyle = {
  B: '#16A4D0',
  Baby: '#ABE3F5',
  BtnStroke: '#91BED7',
  G: '#1F6041',
  Br: '#B15144',
  Lg: '#ACABAB',
};

const OverflowHidden = createGlobalStyle`
  body {
    overflow: hidden;
    margin: 0; 
  padding: 0;
  }
`;


interface HouseBgProps {
  isClickBtn?: boolean;
}

const HouseBackground = styled.div<HouseBgProps>`
  background-image: url(${background});
  background-size: 100% 110%;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  opacity: ${({ isClickBtn }) => (isClickBtn ? 0.3 : 1)};
  z-index: ${({ isClickBtn }) => (isClickBtn ? -99 : 0)};
  position: absolute; /* 또는 fixed, relative - 필요에 따라 선택 */
  top: 0;
  left: 0;
`;


interface FlexCenterProps {
  height?: string;
  width?: string;
}
 const FlexCenter = styled.div<FlexCenterProps>`
 display: flex;
  justify-content: center; 
  align-items: center;     
  height: 100vh;        
  /* height: ${(props) => props.height || '100vh'}; */
`;

 const Flex = styled.div`  
  display: flex;
`;

//join, login btn
interface BtnSmallProps {
  isLogin?: boolean;
  isJoin?: boolean;
}

 const BtnSmall = styled.button<BtnSmallProps>`
  background-color:  ${RootStyle.B};
  color: white;
  text-align: center;
  padding: 6px 1rem;
  border: 1px solid var(--BtnStroke);
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 2%;
  right: ${ ({isLogin, isJoin}) => {
    if(isLogin) return '10%';
    if(isJoin) return '5%';
    return 'auto';
  }};
`;

const WhiteBG = styled.div`
   background-color: #fff;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
  border: 3px solid #91BED7;
  border-radius: 14px;
  padding: 20px; 
  max-width: 400px; 
  width: 50%; 
  margin: 0 auto; 
`

const Header = styled.h2`
text-align: center;
margin-bottom: 3.125rem;
margin-top: 3.125rem;
font-size: 1rem;
font-weight: 500;
color: ${RootStyle.Lg};
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



export { RootStyle, OverflowHidden, HouseBackground, BtnSmall, WhiteBG, Flex, FlexCenter, SocialBtnAll, SocialBtn, Header, Footer, FooterLink, Notice };