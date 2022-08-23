import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions'
import {useAppSelector} from '../../common/hooks/useDispatchAndSelector';
import icon from '../../assets/img/check-email.png'

export const CheckEmail = (props: CheckEmailType) => {
    const email = useAppSelector(state => state.passwordRecovery.email)

    return (
        <Card sx={{maxWidth: 412, margin: '0 auto'}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Check Email
                </Typography>
                <img src={icon}/>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {` We’ve sent an Email with instructions to ${email}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"
                        onClick={props.onClickBackToLogin}
                >
                    Back to login
                </Button>
            </CardActions>
        </Card>
    );
};
//type
type CheckEmailType = {
    onClickBackToLogin?: () => void
}

