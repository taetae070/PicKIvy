import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { RootStyle } from 'src/layouts/commonStyle';

interface CloseBtnProps {
    onClose?: () => void;
}
/*
()는 이 함수가 매개변수를 받지 않는다는 의미
void는 이 함수가 반환하는 값이 없다는 것을 의미
*/

const StyledCloseBtn = styled.button`
  background: transparent;
    color: ${RootStyle.BtnStroke};
    border: none;
    font-size: 1.25rem;
    position: absolute;
    right: 37%;
    top: 14%;
    cursor: pointer;

`

const CloseBtn: React.FC<CloseBtnProps> = ({onClose}) =>{

    const [clickClose, setClickClose] = useState<boolean>(false);

    const handleCloseChange = useCallback(() => {
        setClickClose(true); 
        if (onClose) {
            onClose(); 
        }
    }, [onClose]);

    return (
        <StyledCloseBtn type="button" onClick={handleCloseChange} disabled={clickClose}>
            X
        </StyledCloseBtn>
    );

}

export default CloseBtn;