import React from 'react';
import {CustomModal} from "../CustomModal";
import Button from "@mui/material/Button/Button";
import {btnBlockStyle} from "../add-edit-pack-modal/AddEditPackModal";

type DeleteModalType = {
    open: boolean
    handleClose: () => void
    title: string
    packName: string
    deleteCallback: () => void
}

export const DeletePackModal: React.FC<DeleteModalType> = ({open, handleClose, title, packName, deleteCallback}) => {
    return (
        <CustomModal title={title} open={open} handleClose={handleClose}>
            <p style={{marginBottom:"5px"}}>{`Do you really want to remove ${packName}?`}</p>
            <p style={{margin:"0px 0px 25px"}}>All cards will be deleted.</p>
            <div style={btnBlockStyle}>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button color="error" variant="contained" onClick={deleteCallback}>Delete</Button>
            </div>
        </CustomModal>
    );
};

