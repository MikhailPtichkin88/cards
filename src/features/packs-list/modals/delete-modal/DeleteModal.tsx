import React, {ReactNode, useState} from 'react';
import {CustomModal} from '../CustomModal';
import {ButtonModal} from '../ButtonModal';

type DeleteModalType = {
    title: string
    name?: string
    childrenDiv: ReactNode
    deleteCallback: () => void
}

export const DeleteModal: React.FC<DeleteModalType> = (props) => {

    const [close, setClose] = useState(false)

    const handleClose = () => {
        setClose(true)
    }

    return (
        <CustomModal title={props.title} childrenDiv={props.childrenDiv} isClose={close} setClose={setClose}>
            
            <p style={{marginBottom: '5px'}}>Do you really want to remove <b>{props.name}</b>?</p>
            <p style={{margin: '0px 0px 25px'}}>All cards will be deleted.</p>

            <ButtonModal onClickSaveHandler={props.deleteCallback}
                         deleteStyle={true}
                         handleClose={handleClose}/>
        </CustomModal>
    );
};

