import React from 'react';
import { useNavigate } from 'react-router-dom';
import {BtnSmall} from 'src/layouts/commonStyle';

const JoinBtn: React.FC = () => {
    const navigate = useNavigate();
    const handleJoinClick = () => {
    navigate('/join'); 
  };
    return(
        <div>
            <BtnSmall isJoin={true} onClick={handleJoinClick}>Join</BtnSmall>
        </div>
    )
}


export default JoinBtn;

