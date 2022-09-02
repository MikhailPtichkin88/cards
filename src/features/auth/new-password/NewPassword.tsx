import React, {useCallback, useState} from 'react'
import Typography from '@mui/material/Typography';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import {updatePassword} from '../password-recovery/password-recovery-reducer';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import commonStyle from '../../../common/style/style.module.css';
import Paper from '@mui/material/Paper/Paper';
import FormControl from '@mui/material/FormControl/FormControl';
import {Box, FormGroup} from '@mui/material';
import Grid from '@mui/material/Grid/Grid';
import {Title} from '../sign-up/title/Title';
import {InputEyeSwitcher} from '../sign-up/text-field/InputEyeSwitcher';
import {setAppStatusAC} from '../../../app/app-reducer';

export const NewPassword = () => {
    const [visible, setVisible] = useState(false)
    const isRegistered = useAppSelector(state => state.signUp.isSignUp)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams<'token'>()
    const token = params['token']

    const
        formik = useFormik({
            initialValues: {
                password: '',
            },
            validationSchema: Yup.object({
                password: Yup
                    .string()
                    .required('Please Enter your password')
                    .matches(
                        /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
                        'Must Contain 8 Characters, One Number and Letter'
                    ),
            }),
            onSubmit: values => {
                if (token) {
                    dispatch(updatePassword(values.password, token))
                }
                formik.resetForm()
            },
        });

    const disabled = (formik.touched.password && !!formik.errors.password)
    const inputEyeSwitcher = useCallback(() => setVisible(!visible), [visible])

    if (status === 'succeeded') {
        dispatch(setAppStatusAC('idle'))
        navigate('/login')
    }

    return (
        <Paper elevation={20} className={commonStyle.paperStyle}>
            <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{mb: 5}}>
                        <Title isRegistered={isRegistered}
                               headerText={' Create new password'}
                        />
                    </Box>
                    <FormControl>
                        <FormGroup>
                            <TextField type={visible ? 'text' : 'password'}
                                       label="Password"
                                       variant="standard"
                                       {...formik.getFieldProps('password')}
                                       error={formik.touched.password && !!formik.errors.password}
                                       helperText={formik.touched.password && formik.errors.password}
                                       onBlur={formik.handleBlur}
                                       margin={'normal'}
                                       InputProps={{
                                           endAdornment: (
                                               <InputEyeSwitcher visible={visible} callback={inputEyeSwitcher}/>
                                           ),
                                       }}
                            />
                            <Typography sx={{fontSize: 14, mt: 3,}} color="text.secondary" gutterBottom>
                                Create new password and we will send you further instructions to email
                            </Typography>
                            <Button type="submit"
                                    variant="contained"
                                    disabled={disabled}
                                    className={commonStyle.btnStyle}
                            >
                                Create new password
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Paper>
    )
}
