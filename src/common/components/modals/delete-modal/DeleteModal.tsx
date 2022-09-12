import React, {ReactNode} from 'react';
import {CustomModal} from '../CustomModal';

type DeleteModalType = {
    title: string
    name?: string
    childrenDiv: ReactNode
    deleteCallback: () => void
}

export const DeleteModal: React.FC<DeleteModalType> = (props) => {

    return (
        <CustomModal title={props.title}
                     childrenDiv={props.childrenDiv}
                     deleteStyle={true}
                     onClickSaveHandler={props.deleteCallback}>

            <p style={{marginBottom: '5px'}}>Do you really want to remove <b>{props.name}</b>?</p>
            <p style={{margin: '0px 0px 25px'}}>All cards will be deleted.</p>
            
        </CustomModal>
    );
};

