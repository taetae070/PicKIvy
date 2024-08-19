import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FormPosition = styled.form`
  position: relative;
`;

const FormSetting = styled.input`
  border: 1px solid white;
  border-radius: 4px;
  height: 1.5rem;
`;

//폼 타입 지정
interface RoomType {
  key: string;
  value: string;
}

//폼 입력값 타입 지정: RoomInput은 roomtype이라는 속성을 가지고 있고, 이 속성은 객체인데 이 객체는 RoomType타입이다.
interface FormInput{
  roomtype: RoomType[];
}

// 초기값 설정: 로컬 스토리지에서 로드 or 초기값 사용
/*
() 안에 인자가 없는 것은 이 함수가 인자를 받지 않는다는 의미입니다.
: RoomInput은 함수가 RoomInput 타입의 값을 반환한다는 의미입니다.

(): RoomInput: 이 부분은 함수의 반환 타입을 명시

"formInputKey": 로컬에서 사용되는 키 이름, 내가 임의대로 정해도됨
*/
const getInitialRoomInput= (): FormInput =>{
  const savedFromInput = localStorage.getItem("formInputKey");
  return savedFromInput ? JSON.parse(savedFromInput) : {
    roomtype: [
      { key: "a", value: "career" },
      { key: "b", value: "relationship" },
      { key: "c", value: "financial" },
      { key: "d", value: "other" },
      { key: "e", value: "other" },
    ],
  };
};


/*RoomTypeInput 정의
1.roomInput값 상태정의..?
2.로컬에 변경값 저장
3.입력값 업데이트
4.이벤트 차단
5. 리턴값
 */

const RoomTypeInput : React.FC = () =>{
  const [ formInput, setFormInput ] = useState<FormInput>(getInitialRoomInput);

  useEffect(()=>{
    localStorage.setItem("formInputKey", JSON.stringify(formInput));
  }, [formInput]);

  const inputHandleChange = (key: string, newValue: string) => {
    /*prevInput: setFormInput 함수의 인자로 전달되는 콜백 함수의 매개변수입니다. 이 매개변수는 현재 상태(업데이트 이전의 상태)를 가리킵니다. 
    (prevInput => {...}): 콜백함수*/
    setFormInput(prevInput => ({
      ...prevInput,
       /*roomtype 속성은 배열입니다. 이 배열 내의 각 항목을 순회하면서, 특정 항목의 value를 업데이트하는 로직을 구현합니다. 
       
       map 함수는 배열의 각 요소를 순회하며, 콜백 함수의 반환 값으로 새로운 배열을 생성합니다.
       
       조건: newRoomType.key === key가 참인지 거짓인지를 평가합니다.
newRoomType.key === key: 현재 순회 중인 배열 요소의 key가, 함수 호출 시 전달된 key와 일치하는지 확인합니다.
참일 때 (true): { ...newRoomType, value: newValue }
newRoomType 객체의 복사본을 생성하면서, value 속성만 newValue로 업데이트합니다.
거짓일 때 (false): newRoomType
현재의 newRoomType 객체를 변경 없이 그대로 반환합니다.*/
      roomtype: prevInput.roomtype.map(newRoomType =>
        newRoomType.key === key 
          ? { ...newRoomType, value: newValue } 
          : newRoomType
      ),     
    }));
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
  };

  return(
    <FormPosition onSubmit={onSubmitForm}>
      {formInput.roomtype.map((newRoomType)=>(
        <div key = {newRoomType.key}>
          <FormSetting
            id = {newRoomType.key}
            value = {newRoomType.value}
            onChange = {(e)=> inputHandleChange(newRoomType.key, e.target.value)}
          />
        </div>
      ))}
    </FormPosition>
  )
};



export default RoomTypeInput ;
