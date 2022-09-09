import React from 'react';
import commonStyle from '../../style/style.module.css';
import Button from '@mui/material/Button';

export const ButtonModal: React.FC<ButtonModalType> = (props) => {
    return (
        <div className={commonStyle.modalBtnBlock}>

            <Button onClick={props.handleClose}
                    variant="outlined"
                    className={commonStyle.btnStyle}>Cancel</Button>

            {props.deleteStyle
                ? <Button color="error"
                          variant="contained"
                          onClick={props.onClickSaveHandler}
                          className={commonStyle.btnStyle}>Delete</Button>

                : <Button variant="contained"
                          onClick={props.onClickSaveHandler}
                          className={commonStyle.btnStyle}>Save</Button>
            }
        </div>
    );
};
//type
type ButtonModalType = {
    deleteStyle?: boolean
    handleClose: () => void
    onClickSaveHandler: () => void
}

