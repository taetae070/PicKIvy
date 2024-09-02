import useInput from 'src/hooks/useInput';
import fetcher from 'src/utils/fetcher'; // 데이터 가져오는 함수
import React, { useCallback, useState, ChangeEvent } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from 'src/pages/JoinPage/styles';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { data, mutate } = useSWR('/api/users', fetcher);
  const navigate = useNavigate();

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [pw, , setPw] = useInput(''); //handler 필요없어서 비워둠(대신 handlePwChange 커스텀핸들러 사용) 
  const [pwCheck, , setPwCheck] = useInput(''); //이하비슷
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

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

        setSignUpError('');
        setSignUpSuccess(false);
        axios
          .post('/api/users', {
            email,
            nickname,
            pw,  
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
            mutate(); 
            navigate('/workspace/sleact/channel/일반'); 
          })
          .catch((error) => {
            console.log(error.response); 
            setSignUpError(error.response.data);
          });
      }
    },
    [email, nickname, pw, mismatchError, setSignUpError, setSignUpSuccess, mutate, navigate],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    navigate('/house'); 
    return null; }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="pw-label">  
          <span>비밀번호</span>
          <div>
            <Input type="password" id="pw" name="pw" value={pw} onChange={handlePwChange} />  
          </div>
        </Label>
        <Label id="pw-check-label">  
          <span>비밀번호 확인</span>
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
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
     );
  
}
export default SignUp;