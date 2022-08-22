import React from 'react';
import {IconButton, InputAdornment} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

type InputAdornmentPropsType = {
    visible: boolean
    callback: () => void
}
export const InputEyeSwitcher = React.memo(({visible, callback}: InputAdornmentPropsType) => {
    return (
        <InputAdornment position='end'>
            <IconButton onClick={callback}>
                {visible ? <VisibilityOffIcon/> : <VisibilityIcon/>}
            </IconButton>
        </InputAdornment>
    );
});
