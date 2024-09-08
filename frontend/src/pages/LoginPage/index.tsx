import useInput from 'src/hooks/useInput';
import fetcher from 'src/utils/fetcher'; // 데이터 가져오는 함수
import React, { useCallback, useState, ChangeEvent  } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Success, Form, Error, Label, Input, LinkContainer, Button } from 'src/pages/JoinPage/styles';
import { Link, useNavigate } from 'react-router-dom';
import { HouseBackground, OverflowHidden, WhiteBG, FlexCenter, Header } from 'src/layouts/commonStyle';
import CloseBtn from 'src/components/CloseBtn';

const LoginPage = () => {

  const { data, mutate, error } = useSWR('http://localhost:5001/api/users', fetcher);
  const navigate = useNavigate();

  // 이메일, 유저네임, 비밀번호 관련 상태 관리
  const [email, onChangeEmail] = useInput('');
  const [username, onChangeUsername] = useInput('');  
  const [pw, , setPw] = useInput(''); // handler 필요없어서 비워둠 (대신 handlePwChange 커스텀 핸들러 사용) 
  const [pwCheck, , setPwCheck] = useInput(''); 

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  

  // 비밀번호 확인 로직
  const handlePwChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPw(value);
      setIsPasswordMatch(value === pwCheck); // 비밀번호 불일치 여부
      // console.log('value === pwCheck', value === pwCheck)
    },
    [pwCheck, setPw], 
  );

  const handlePwCheckChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPwCheck(value);
      setIsPasswordMatch(value === pw);
    },
    [pw, setPwCheck],
  );


  const handleInputReset = (setter: typeof onChangeEmail) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e) // 상태 업데이트
    setJoinError('');  //인풋초기화
  };
  

  // 회원가입 제출 로직
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); //새로고침 방지: 
      setHasSubmitted(true);

      // 비밀번호 일치, username 입력확인
      if (isPasswordMatch && username) {
        setJoinError('');
        setJoinSuccess(false);
        axios
          .post('http://localhost:5001/api/users', {
            email,
            username, 
            password: pw,  
            passwordConfirm: pwCheck,
          },
          // {headers: {'content-type': 'application/x-www-form-urlencoded'}}: 전송 데이터 타입 정하고 싶을 때 적어줌
        )
          .then((response) => {
            console.log(response);
            setJoinSuccess(true);
            mutate('http://localhost:5001/api/users', false);  // SWR 캐시 데이터 갱신
            setJoinSuccess(true);
          })
          .catch((error) => {
            console.log(error.response); 
            // 에러 상태코드 404 대신 400을 기대하도록 수정합
            if (error.response && error.response.status === 400) {
              setJoinError(error.response.data.message);
            } else {
              setJoinError('Unexpected error occurred.');
            }
          });
      }
    },
    [email, username, pw, pwCheck, isPasswordMatch, setJoinError, setJoinSuccess, mutate],
  );

 

  const handleClose = () => {
    navigate('/house'); // /house 페이지로 이동
  };

  // 데이터 로딩 중일 때
  if (!data && !error) {
    return <div>로딩중...</div>;
  }

  return (
    <div id="container">
      <OverflowHidden />
      <HouseBackground isClickBtn={true} />
      <FlexCenter>
        <WhiteBG>
          <Header>나의 선택 기록, 우리 함께 해봐요</Header>
          <CloseBtn onClose={handleClose} />
          <Form onSubmit={onSubmit}>
            <Label id="email-label">
              <span>email address</span>
              <div>
                <Input type="email" id="email" name="email" value={email} onChange={handleInputReset(onChangeEmail)} />
              </div>
            </Label>
        
            <Label id="pw-label">
              <span>password</span>
              <div>
                <Input type="password" id="pw" name="pw" value={pw} onChange={handleInputReset(handlePwChange)} />
              </div>
            </Label>
            
            <Label id="pw-check-label">
              <span>password confirm</span>
              <div>
                <Input
                  type="password"
                  id="pw-check"
                  name="pw-check"
                  value={pwCheck}
                  onChange={handleInputReset(handlePwCheckChange)}
                />
              </div>
              {/* {pwCheck.length > 0 && !isPasswordMatch && <Error>비밀번호가 일치하지 않습니다.</Error>}
              {hasSubmitted &&!username && <Error>유저네임을 입력해주세요.</Error>} */}
            </Label>
            <Button type="submit">Login</Button>
          </Form>
        </WhiteBG>
      </FlexCenter>
    </div>
  );
};

export default LoginPage;
