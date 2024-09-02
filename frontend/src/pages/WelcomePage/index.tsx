import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import  {FlexCenter}  from "src/layouts/commonStyle";

  const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Ensure video is behind other elements */
  opacity: 0.5; /* Optional: To make the video slightly transparent */
`;
  
  const Button = styled.button`
    border: none;
    background: none;
    color: #333;
    font-size: 50px;
  `;

interface WelcomeMessage {
    id: number;
    title: string;
  }
  
  interface WelcomePageProps {
    // 필요한 props 타입을 정의
  }
  
  const welcomeMessages: WelcomeMessage[] = [
    {
      id: 1,
      title: "어떤 선택이든 괜찮아요",
    },
    {
      id: 2,
      title:
        "~ 연구에 따르면, 결과에 상관없이 선택을 '실행'한 사람이 60% 더 행복하다고 해요.",
    },
    {
      id: 3,
      title:
        "결과가 어떻든 그 때 당시에는 우리에겐 최선의 선택이었음은 확실해요",
    },
    {
      id: 4,
      title: "선택을 너무 겁내지 마세요. 우리 같이 선택해봐요.",
    },
  ];
  
  const WelcomePage: React.FunctionComponent<WelcomePageProps> = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
  
    //맨 마지막 글선택-> House 페이지로 이동
    const indexHandler = () => {
      if (currentIndex < welcomeMessages.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (currentIndex === welcomeMessages.length - 1) {
        navigate("/house");
      }
    };
  
    return (
      <>
      <BackgroundVideo autoPlay loop muted>
        <source src="../../img/welcomePageBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <FlexCenter height="50vh" width="50vw">
        <Button type="button" onClick={indexHandler}>
          {welcomeMessages[currentIndex].title}
        </Button>
      </FlexCenter>
      </>
    );
  };
  
  export default WelcomePage ;