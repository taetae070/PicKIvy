import React from "react";
import styled from "styled-components";
import 'src/layouts/commonStyle.module.css';
import background from "src/img/house.BG.png";
import RoomTypeInput  from "src/components/RoomTypeInput";
import LoginBtn from "src/components/LoginBtn";
import JoinBtn from "src/components/JoinBtn";

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