import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {NavLink} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import {useAppSelector} from '../../common/hooks/useDispatchAndSelector';

export const CheckEmail = () => {
    const email = useAppSelector(state => state.passwordRecovery.email)

    return (
        <Card sx={{maxWidth: 412, margin: '0 auto'}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Check Email
                </Typography>

                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {` We’ve sent an Email with instructions to ${email}`}
                </Typography>
            </CardContent>
            <CardActions>
                <NavLink to={'/login'}>
                    <Button size="small">Back to login</Button>
                </NavLink>
            </CardActions>
        </Card>
    );
};

