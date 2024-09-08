import useInput from 'src/hooks/useInput';
import fetcher from 'src/utils/fetcher'; // 데이터 가져오는 함수
import React, { useCallback, useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Success, Form, Error, Label, Input, LinkContainer, Button } from 'src/pages/JoinPage/styles';
import { Link, useNavigate } from 'react-router-dom';
import { HouseBackground, OverflowHidden, WhiteBG, FlexCenter, Header } from 'src/layouts/commonStyle';
import CloseBtn from 'src/components/CloseBtn';

const JoinPage = () => {

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
  

  // 비밀번호 확인 로직
  const handlePwChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPw(value);
      console.log('value === pwCheck', value === pwCheck)
      console.log('value , pwCheck', value, pwCheck)
      setIsPasswordMatch(value === pwCheck); // 비밀번호 불일치 여부
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

  //메세지 초기화
  //setter는 setJoinError를 쓰는 함수이다.? 그래서 setJoinError의 타입과 같은 타입으로 맞춰줘야한다.
  //setJoinError에 호버하면 const setJoinError: React.Dispatch<React.SetStateAction<string>>이런게 뜨는데 이거랑 똑같이 맞춰줘야한다.
  //상태업데이트도 하고, 에러뜨고 인풋에 입력하면 초기화하게 만드는 함수
  //setter함수에 e를 넣어서 업데이트
  //setter를 쓰는 이유는 각 인풋마다 들어갈 함수가 다르기때문에 광범위하게 적용하기 위해서 사용하는 것이다. 
  const handleInputReset = (setter: typeof onChangeEmail) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e) // 상태 업데이트
    setJoinError('');  //인풋초기화
  };
  

  // 회원가입 제출 로직
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); //새로고침 방지: 
      console.log('tst', isPasswordMatch, username)

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
            <Label id="username-label">
              <span>username</span>
              <div>
                <Input type="text" id="username" name="username" value={username} onChange={handleInputReset(onChangeUsername)} /> {/* nickname -> username */}
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
              {pwCheck.length > 0 && !isPasswordMatch && <Error>비밀번호가 일치하지 않습니다.</Error>}
              {!username && <Error>유저네임을 입력해주세요.</Error>}
              {joinError && <Error>{joinError}</Error>}
              {joinSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
            </Label>
            <Button type="submit">Join</Button>
          </Form>
          <LinkContainer>
            이미 회원이신가요?&nbsp;
            <Link to="/login">로그인 하러가기</Link>
          </LinkContainer>
        </WhiteBG>
      </FlexCenter>
    </div>
  );
};

export default JoinPage;
