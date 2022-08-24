import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import icon from '../../../assets/img/check-email.png'
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import Paper from '@mui/material/Paper/Paper';
import commonStyle from './style.module.css'
import Grid from '@mui/material/Grid/Grid';
import {Title} from '../signUp/Title/Title';
import {Box} from '@mui/material';

export const CheckEmail = (props: CheckEmailType) => {
    const email = useAppSelector(state => state.passwordRecovery.email)
    const isRegistered = useAppSelector(state => state.signUp.isSignUp)

    return (
        <Paper elevation={20} className={commonStyle.paperStyle}>
            <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <Title isRegistered={isRegistered}
                       headerText={'Check Email'}
                />
                <Box sx={{width: 108, height: 108}}>
                    <img src={icon} alt={'email'}/>
                </Box>
                <Typography sx={{fontSize: 14, mt: 4, mb: 4, textAlign: 'center'}} color="text.secondary" gutterBottom>
                    {` We’ve sent an Email with instructions to ${email}`}
                </Typography>
                <Button size="small"
                        variant="contained"
                        onClick={props.onClickBackToLogin}
                        className={commonStyle.btnStyle}
                >
                    Back to login
                </Button>
            </Grid>
        </Paper>
    );
};
//type
type CheckEmailType = {
    onClickBackToLogin?: () => void
}

