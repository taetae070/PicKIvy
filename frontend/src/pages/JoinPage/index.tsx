import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState, VFC } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import { Link, Redirect } from 'react-router-dom';


const SignUp = () => {
    const {data, error, revalidate } = useSWR('/api/users', fetcher);

    const [ email, setEmail] = useState();
    const [ nickName, setNickName ] = ;
    const [ password, setPassWord ] = ;
    const [ passwordCheck,setPasswordCheck ] = useState (false);
    const [ misMatchError, setMisMatchError] = useState (false);
    const [ joinUpError, setJoinUpError ] = useState(''); //서버에서 보낸 에러메세지

    onchange = () =>{
        
    }

}