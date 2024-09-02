import React, { useCallback, useState } from 'react';

const CloseBtn = ({onClose}) =>{

    const [clickClose, setClickClose] = useState(false);
    const handleCloseChange = useCallback(() => {
        setClickClose(true); 
        if (onClose) {
            onClose(); 
        }
    }, [onClose]);

    return (
        <button onClick={handleCloseChange} disabled={clickClose}>
            Close
        </button>
    );

}

export default CloseBtn;