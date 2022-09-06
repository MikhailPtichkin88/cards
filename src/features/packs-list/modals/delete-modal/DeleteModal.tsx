import React, {ReactNode, useState} from 'react';
import {CustomModal} from '../CustomModal';
import Button from '@mui/material/Button/Button';
import commonStyle from '../../../../common/style/style.module.css';

type DeleteModalType = {
    title: string
    name?: string
    childrenDiv: ReactNode
    deleteCallback: () => void
}

export const DeleteModal: React.FC<DeleteModalType> = ({
                                                           childrenDiv,
                                                           title,
                                                           name,
                                                           deleteCallback
                                                       }) => {

    const [close, setClose] = useState(false)

    const handleClose = () => {
        setClose(true)
    }

    return (
        <CustomModal title={title} childrenDiv={childrenDiv} isClose={close} setClose={setClose}>
            <p style={{marginBottom: '5px'}}>{`Do you really want to remove ${name}?`}</p>
            <p style={{margin: '0px 0px 25px'}}>All cards will be deleted.</p>
            <div className={commonStyle.modalBtnBlock}>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button color="error" variant="contained" onClick={deleteCallback}>Delete</Button>
            </div>
        </CustomModal>
    );
};

