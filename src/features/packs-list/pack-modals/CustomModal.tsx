import * as React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from "./CustomModal.module.css";
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: "20px 25px",
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
    paddingBottom: "15px",
    borderBottom:"1px solid lightgrey"
};

type CustomModalType = {
    open: boolean
    handleClose: () => void
    children: ReactNode
    title: string
}

export const CustomModal: React.FC<CustomModalType> = ({open, handleClose, children, title}) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <div style={headerStyle}>
                    <h3 style={{margin: '0px'}}>{title}</h3>
                    <IconButton aria-label="delete" onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                {children}
            </Box>
        </Modal>
    );
}