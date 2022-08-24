import React, {useCallback} from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {passwordRecoveryLink, setStatusSendingPassword} from './password-recovery-reducer';
import {CheckEmail} from './CheckEmail';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import Paper from '@mui/material/Paper/Paper';
import Grid from '@mui/material/Grid/Grid';
import {Title} from '../signUp/Title/Title';
import FormControl from '@mui/material/FormControl/FormControl';
import {Box, FormGroup} from '@mui/material';
import commonStyle from './style.module.css'


export const PasswordRecovery = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const statusSendingPassword = useAppSelector(state => state.passwordRecovery.statusSendingPassword)
    const isRegistered = useAppSelector(state => state.signUp.isSignUp)
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            dispatch(passwordRecoveryLink(values.email))
            formik.resetForm()
        },
    });
    const disabled = (formik.touched.email && !!formik.errors.email)

    const onClickBackToLogin = useCallback(() => {
        dispatch(setStatusSendingPassword('idle'))
        navigate('/login')
    }, [])

    if (statusSendingPassword === 'loading') {
        return <CheckEmail onClickBackToLogin={onClickBackToLogin}/>
    }

    return (
        <Paper elevation={20} className={commonStyle.paperStyle}>
            <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <Title isRegistered={isRegistered}
                       headerText={'Forgot your password?'}
                />
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                error={formik.errors.email !== undefined}
                                helperText={formik.errors.email}
                                // disabled={isLoading}
                                label="Email"
                                variant="standard"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            <Typography sx={{mb: 10, mt: 4}} color="text.secondary">
                                Enter your email address and we will send you further instructions
                            </Typography>
                            <Button variant="contained"
                                    type="submit"
                                    disabled={disabled}
                                    className={commonStyle.btnStyle}
                            >
                                Send Instructions
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
                <Typography sx={{fontSize: 14, mt: 4, mb: 2}} color="text.secondary" gutterBottom>
                    Did you remember your password?
                </Typography>

                <Button size="small"
                        onClick={onClickBackToLogin}
                ><Box sx={{borderBottom: 2, lineHeight: 1}}>
                    Try logging in
                </Box>
                </Button>
            </Grid>
        </Paper>
    );
}


