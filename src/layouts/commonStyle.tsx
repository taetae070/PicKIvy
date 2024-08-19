import styled from "styled-components";
import './commonStyle.module.css';

// 스타일 타입 정의
interface FlexCenterProps {
  height?: string;
  width?: string;
}

// 스타일 컴포넌트 정의
 const FlexCenter = styled.form<FlexCenterProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.height || '100vh'};
  width: ${(props) => props.width || '100vw'};
`;


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

 const Flex = styled.div`  /* Flex를 div 요소로 정의 */
  display: flex;
`;

export { BtnSmall, Flex, FlexCenter };