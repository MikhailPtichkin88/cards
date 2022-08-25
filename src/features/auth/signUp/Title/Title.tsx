import React from 'react';
import {Avatar, Typography} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import style from './Title.module.css'

const avatarStyle = {backgroundColor: 'white'}
type TitlePropsType = {
    isRegistered: boolean
    typographyText?: string
    headerText: string
}
export const Title = React.memo(({isRegistered, typographyText, headerText}: TitlePropsType) => {

    return (<div className={style.titleContainer}>
            <Avatar style={avatarStyle}>
                <HowToRegIcon color={isRegistered ? 'success' : 'primary'}/>
            </Avatar>
            <h2>{headerText}</h2>
            {typographyText && <Typography gutterBottom variant={'caption'}>{typographyText}</Typography>}
        </div>

    );
})
