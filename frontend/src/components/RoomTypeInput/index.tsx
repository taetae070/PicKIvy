import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FormPosition = styled.form`
  position: relative;
`;

const InputSetting = styled.input`
  border: 1px solid white;
  border-radius: 4px;
  height: 1.5rem;
`;

interface RoomType {
  key: string;
  value: string;
}

interface FormInput {
  roomtype: RoomType[];
}

const getInitialFormInput = (): FormInput => {
  const savedFormInput = localStorage.getItem(" ");
  return savedFormInput ? JSON.parse(savedFormInput) : {
    roomtype: [
      { key: "a", value: "career" },
      { key: "b", value: "relationship" },
      { key: "c", value: "financial" },
      { key: "d", value: "other" },
      { key: "e", value: "other" },
    ],
  };
};

const RoomTypeInput: React.FC = () => {
  const [formInput, setFormInput] = useState<FormInput>(getInitialFormInput);

  //localStorage: 문자열 형태의 데이터만 저장가능
  useEffect(() => {
    localStorage.setItem("formInputKey", JSON.stringify(formInput));
  }, [formInput]);

  const inputHandleChange = (key: string, newValue: string) => {
    setFormInput(prevInput => ({
      ...prevInput,
      roomtype: prevInput.roomtype.map(newRoomType =>
        newRoomType.key === key 
          ? { ...newRoomType, value: newValue } 
          : newRoomType
      ),     
    }));
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <FormPosition onSubmit={onSubmitForm}>
      {formInput.roomtype.map((newRoomType) => (
        <div key={newRoomType.key} className="roomWrapper">
          <InputSetting
            id={newRoomType.key}
            value={newRoomType.value}
            onChange={(e) => inputHandleChange(newRoomType.key, e.target.value)}
          />
        </div>
      ))}
    </FormPosition>
  );
};

export default RoomTypeInput;
