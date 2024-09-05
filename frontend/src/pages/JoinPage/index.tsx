import useInput from 'src/hooks/useInput';
import fetcher from 'src/utils/fetcher'; // 데이터 가져오는 함수
import React, { useCallback, useState, ChangeEvent } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Success, Form, Error, Label, Input, LinkContainer, Button } from 'src/pages/JoinPage/styles';
import { Link, useNavigate } from 'react-router-dom';
import { HouseBackground, OverflowHidden, WhiteBG, FlexCenter, Header } from 'src/layouts/commonStyle';
import CloseBtn from 'src/components/CloseBtn'

const JoinPage = () => {
  const { data, mutate, error } = useSWR('http://localhost:5001/api/users', fetcher);
  const navigate = useNavigate();

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [pw, , setPw] = useInput(''); //handler 필요없어서 비워둠(대신 handlePwChange 커스텀핸들러 사용) 
  const [pwCheck, , setPwCheck] = useInput(''); //이하비슷
  const [mismatchError, setMismatchError] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);

  const handlePwChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPw(value);
      setMismatchError(value !== pwCheck); //같으면 false를 반환
    },
    [pwCheck, setPw], //setPw: 필수는 아니지만 안전성을 위해 포함함
  );

  const handlePwCheckChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPwCheck(value);
      setMismatchError(value !== pw);
    },
    [pw, setPwCheck],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!mismatchError && nickname) {
        console.log('서버로 회원가입하기');

        setJoinError('');
        setJoinSuccess(false);
        axios
          .post('http://localhost:5001/api/users', {
            email,
            nickname,
            password: pw,  
          })
          .then((response) => {
            console.log(response);
            setJoinSuccess(true);
            mutate('http://localhost:5001/api/users', true); 
            navigate('/workspace/sleact/channel/일반'); 
          })
          .catch((error) => {
            console.log(error.response); 
            setJoinError(error.response.data);
          });
      }
    },
    [email, nickname, pw, mismatchError, setJoinError, setJoinSuccess, mutate, navigate],
  );

  const handleClose = () => {
    navigate('/house'); // /house 페이지로 이동
  };

  if (!data && !error) {
    return <div>로딩중...</div>;
  }

  // if (data) {
  //   navigate('/house'); 
  //   return null; }

  return (
    <div id="container">
      <OverflowHidden/>
      <HouseBackground isClickBtn={true}/>
      <FlexCenter>
        <WhiteBG>
          <Header>나의 선택 기록,
          우리 함께 해봐요</Header>
          <CloseBtn onClose={handleClose}/>
          <Form onSubmit={onSubmit}>
            <Label id="email-label">
              <span>email address</span>
              <div>
                <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
              </div>
            </Label>
            <Label id="nickname-label">
              <span>username</span>
              <div>
                <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
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
              {!nickname && <Error>닉네임을 입력해주세요.</Error>}
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
  
}
export default JoinPage;