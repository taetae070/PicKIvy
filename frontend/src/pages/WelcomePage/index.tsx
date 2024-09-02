import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  {FlexCenter}  from "src/layouts/commonStyle";
import styled from "styled-components";
import {RootStyle, OverflowHidden} from 'src/layouts/commonStyle';

  const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; 
  opacity: 0.4; 
`;
  
  const Button = styled.button`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 700;
    border: none;
    background: none;
    color: ${RootStyle.G};
    font-size: 3.75rem;
    width:1100px;
    line-height: 5.625rem;
  `;

interface WelcomeMessage {
    id: number;
    title: string;
  }
  
 
  
  const welcomeMessages: WelcomeMessage[] = [
    {
      id: 1,
      title: "어떤 선택이든 괜찮아요",
    },
    {
      id: 2,
      title:
        "선택을 행동으로 옮긴 사람은\n 결과에 상관없이 60%\n 더 행복하다는 연구결과가 있어요",
    },
    {
      id: 3,
      title:
        "결과에 상관없이 우리는\n 스스로에게 최고의 선택을 선물했어요",
        // 결과에 상관없이 우리는 우리에게 최고의 선택을 선물했어요
        // 결과가 어떻든, 그때 우리는 그 순간 최선의 선택을 했어요.
    },
    {
      id: 4,
      title: "소중한 나에게 나쁜 일이 생기도록\n 결정하지 않았을 테니까요.",
    },
    {
      id: 5,
      title: "선택을 너무 겁내지 마세요.\n 우리 이제 같이 선택해봐요.",
    },
  ];
  
  const WelcomePage: React.FunctionComponent = () => {
    // 비디오 재생 속도 조절
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.7;  
      }
    }, []);
  
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
      <OverflowHidden /> 
      <BackgroundVideo  ref={videoRef} autoPlay loop muted>
        <source src="/directionBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <FlexCenter >
        <Button type="button" onClick={indexHandler} style={{ whiteSpace: 'pre-line' }}>
          {welcomeMessages[currentIndex].title}
        </Button>
      </FlexCenter>
      </>
    );
  };
  
  export default WelcomePage ;