import useInput from 'src/hooks/useInput';
import fetcher from 'src/utils/fetcher'; // 데이터 가져오는 함수
import React, { useCallback, useState, ChangeEvent } from 'react';
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
  const [username, onChangeUsername] = useInput('');  // nickname을 username으로 변경
  const [pw, , setPw] = useInput(''); // handler 필요없어서 비워둠 (대신 handlePwChange 커스텀 핸들러 사용) 
  const [pwCheck, , setPwCheck] = useInput(''); // 이하 비슷

  const [mismatchError, setMismatchError] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);

  // 비밀번호 확인 로직
  const handlePwChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPw(value);
      setMismatchError(value !== pwCheck); // 비밀번호 확인 불일치 여부
    },
    [pwCheck, setPw], // 의존성 배열에 필요한 값들
  );

  const handlePwCheckChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPwCheck(value);
      setMismatchError(value !== pw);
    },
    [pw, setPwCheck],
  );

  // 회원가입 제출 로직
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 비밀번호 일치 여부와 username 확인
      if (!mismatchError && username) {
        console.log('서버로 회원가입 요청 중...');

        setJoinError('');
        setJoinSuccess(false);
        axios
          .post('http://localhost:5001/api/users', {
            email,
            username, 
            password: pw,  
            passwordConfirm: pwCheck 
          })
          .then((response) => {
            console.log(response);
            setJoinSuccess(true);
            mutate('http://localhost:5001/api/users', false);  // SWR 캐시 데이터 갱신
            navigate('/house'); 
          })
          .catch((error) => {
            console.log(error.response); 
            // 에러 상태코드 404 대신 400을 기대하도록 수정합
            if (error.response && error.response.status === 400) {
              setJoinError(error.response.data.message);
            } else {
              setJoinError('Unexpected error occurred.');
            }
            // console.log(error.response); 
            // setJoinError(error.response ? error.response.data : 'Unexpected error occurred.');
          });
      }
    },
    [email, username, pw, pwCheck, mismatchError, setJoinError, setJoinSuccess, mutate, navigate],  // 의존성 배열에 username 반영
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
                <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
              </div>
            </Label>
            <Label id="username-label">
              <span>username</span>
              <div>
                <Input type="text" id="username" name="username" value={username} onChange={onChangeUsername} /> {/* nickname -> username */}
              </div>
            </Label>
            <Label id="pw-label">
              <span>password</span>
              <div>
                <Input type="password" id="pw" name="pw" value={pw} onChange={handlePwChange} />
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
                  onChange={handlePwCheckChange}
                />
              </div>
              {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
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
