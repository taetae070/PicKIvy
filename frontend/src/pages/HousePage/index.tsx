import React from "react";
import styled from "styled-components";
// import background from "src/img/house.BG.png";
import RoomTypeInput  from "src/components/RoomTypeInput";
import LoginBtn from "src/components/LoginBtn";
import JoinBtn from "src/components/JoinBtn";

import {OverflowHidden, HouseBackground} from 'src/layouts/commonStyle';

const Form = styled.form`
  position: relative;
`;

const Ol = styled.ol``;

const HousePage: React.FC = () => {
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <OverflowHidden/>
      <HouseBackground>
        <LoginBtn />
        <JoinBtn/>
        <Form onSubmit={onSubmitForm}>
          <Ol>
            <RoomTypeInput />
          </Ol>
        </Form>
      </HouseBackground>
    </>
   
  );
}

export default HousePage;