import * as React from 'react';
import {ReactNode, useEffect} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import commonStyle from '../../style/style.module.css';
import Button from '@mui/material/Button';
import {useAppSelector} from '../../hooks/useAppSelector';
import useMediaQuery from "@mui/material/useMediaQuery";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '20px 25px',
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '35px',
    paddingBottom: '15px',
    borderBottom: '1px solid lightgrey'
};

type CustomModalType = {
    children: ReactNode
    childrenDiv: ReactNode
    title: string
    deleteStyle: boolean
    isClosed?: boolean
    setDataOnClose?: () => void
    onClickSaveHandler: () => void
}

export const CustomModal: React.FC<CustomModalType> = (props) => {
    const status = useAppSelector(state => state.app.status)
    const [open, setOpen] = React.useState(false);


    const matches = useMediaQuery('(min-width:991px)');
    const handleOpenClose = () => {
        setOpen(!open)
        if (props.setDataOnClose) props.setDataOnClose()
    };

    const onClickSaveHandler = () => {
        props.onClickSaveHandler()
    }
    useEffect(() => {
        if (props.isClosed) {
            handleOpenClose()
        }
    }, [props.isClosed])


    return (
        <>
            <Box onClick={handleOpenClose}>
                {props.childrenDiv}
            </Box>
            <Modal
                open={open}
                onClose={handleOpenClose}
            >
                <Box sx={{...style, width: `${matches?"500px":"300px"}`}}>
                    <div style={headerStyle}>
                        <h3 style={{margin: '0px'}}>{props.title}</h3>
                        <IconButton aria-label="delete" onClick={handleOpenClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    {props.children}
                    <div className={commonStyle.modalBtnBlock}>

                        <Button onClick={handleOpenClose}
                                variant="outlined"
                                className={commonStyle.btnStyle}>Cancel</Button>

                        {props.deleteStyle
                            ? <Button color="error"
                                      variant="contained"
                                      onClick={props.onClickSaveHandler}
                                      disabled={status === 'loading'}
                                      className={commonStyle.btnStyle}>Delete</Button>

                            : <Button variant="contained"
                                      onClick={onClickSaveHandler}
                                      disabled={status === 'loading'}
                                      className={commonStyle.btnStyle}>Save</Button>
                        }
                    </div>
                </Box>
            </Modal>
        </>
    );
}