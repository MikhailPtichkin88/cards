import {signUpTC} from './signUp-reducer';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {useFormik} from 'formik';
import Grid from '@mui/material/Grid/Grid';
import FormControl from '@mui/material/FormControl/FormControl';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import Paper from '@mui/material/Paper/Paper';
import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Title} from './Title/Title';
import {InputEyeSwitcher} from './TextField/InputEyeSwitcher';
import {ErrorSnackbar} from '../../../common/components/errorSnackbar/ErrorSnackbar';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPass?: string
}

export const SignUp = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isRegistered = useAppSelector(state => state.signUp.isSignUp)
    const [visible, setVisible] = useState(false)
    let navigate = useNavigate();
    const routeChange = () => {
        const path = `/login`;
        navigate(path);
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPass: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (formik.values.password.length < 7) {
                errors.password = 'must be more than 7 characters'
            }
            if (values.confirmPass !== values.password) {
                errors.confirmPass = 'Passwords don\'t match'
            }
            return errors;
        },
        onSubmit: values => {
            const signUpData = {email: values.email, password: values.password}
            dispatch(signUpTC(signUpData))
        },
    })
    const paperStyle = {padding: '30px 20px', width: 330, margin: '20px auto'}
    const typographyText = isRegistered ? 'Registration successful!' : 'Please fill this form to create an account'
    const isLoading = status === 'loading'
    const inputEyeSwitcher = useCallback(() => setVisible(!visible), [visible])

    useEffect(() => {
        if (isRegistered) {
            const redirect = setTimeout(() => {
                routeChange()
            }, 2000)
            return () => {
                clearTimeout(redirect)
            }
        }

    }, [isRegistered])
    return <Paper elevation={20} style={paperStyle}>
        <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>

            <Title typographyText={typographyText} isRegistered={isRegistered} headerText={'SIGN UP'}/>

            {isRegistered ? <h3>You will be redirected to login page</h3> : <form onSubmit={formik.handleSubmit}>
                <FormControl>

                    <FormGroup>

                        <TextField
                            error={formik.errors.email !== undefined}
                            helperText={formik.errors.email}
                            disabled={isLoading}
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        <TextField
                            error={formik.touched.password && !!formik.errors.password}
                            helperText={formik.touched.password && !!formik.errors.password && formik.errors.password}
                            disabled={isLoading}
                            type={visible ? 'text' : 'password'}
                            variant="outlined"
                            label="Password"
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputEyeSwitcher visible={visible} callback={inputEyeSwitcher}/>
                                ),
                            }}
                            {...formik.getFieldProps('password')}
                        />
                        <TextField
                            error={formik.touched.confirmPass && !!formik.errors.confirmPass}
                            helperText={formik.touched.confirmPass && !!formik.errors.confirmPass && formik.errors.confirmPass}
                            disabled={isLoading}
                            type={visible ? 'text' : 'password'}
                            variant="outlined"
                            label="Confirm password"
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputEyeSwitcher visible={visible} callback={inputEyeSwitcher}/>
                                ),
                            }}
                            {...formik.getFieldProps('confirmPass')}
                        />
                        <Grid container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center">
                            <Button disabled={isLoading}
                                    onClick={routeChange}
                                    variant={'contained'}
                                    color={'primary'}>
                                Cancel
                            </Button>
                            <Button disabled={isLoading}
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}>
                                {isLoading ? 'WAIT' : 'SIGN UP'}
                            </Button>
                        </Grid>
                    </FormGroup>

                </FormControl>
            </form>}
        </Grid>
        <ErrorSnackbar/>
    </Paper>


}



