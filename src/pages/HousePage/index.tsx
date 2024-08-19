import React from "react";
import styled from "styled-components";
import '../../layouts/commonStyle';
import '../../layouts/commonStyle.module.css';
import background from "../../img/house.BG.png";
import RoomTypeInput  from "../../components/RoomTypeInput";
import LoginBtn from "../../components/LoginJoin/LoginBtn";
import JoinBtn from "../../components/LoginJoin/JoinBtn";

const Wrapper = styled.section`
  background-image: url(${background});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const Form = styled.form`
  position: relative;
`;

const Ol = styled.ol``;

// House 컴포넌트의 타입 정의
const HousePage: React.FC = () => {
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <LoginBtn/>
      <JoinBtn/>
      <Form onSubmit={onSubmitForm}>
        <Ol>
          <RoomTypeInput />
        </Ol>
      </Form>
    </Wrapper>
  );
}

export default HousePage;