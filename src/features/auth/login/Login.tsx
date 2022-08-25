import React from 'react';
import {Button, Checkbox, FormControlLabel, FormLabel, Paper, TextField} from '@mui/material';
import {useFormik} from 'formik';
import styles from './Login.module.css';
import {Navigate, NavLink} from 'react-router-dom';
import {LoginTC} from '../auth-reducer';
import {LoginPostDataType} from '../auth-api';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {routePath} from "../../../common/constants/routePath";
import commonStyle from '../../../common/style/style.module.css';

export const Login = () => {
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        }, validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Empty field'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Empty field'
            } else if (values.password.length < 5) {
                errors.password = 'Password is too short'
            }
            return errors
        },
        onSubmit: values => {
            let data: LoginPostDataType = {
                email: formik.values.email,
                password: formik.values.password,
                rememberMe: formik.values.rememberMe
            }
            dispatch(LoginTC(data))
            formik.resetForm()
        },
    })

    if (isAuth) {
        return <Navigate to="/profile"/>
    }

    return (
        <Paper  elevation={20} className={commonStyle.paperStyle}>
            <h3 className={styles.formTitle}>Login</h3>
            <form onSubmit={formik.handleSubmit} className={styles.formBlock}>
                <TextField label="Email"
                           variant="standard"
                           {...formik.getFieldProps('email')}
                           onBlur={formik.handleBlur}
                           error={formik.touched.email && !!formik.errors.email}
                           helperText={formik.touched.email && formik.errors.email}
                           className={styles.formInput}
                           margin={'normal'}
                />
                <TextField type="password" label="Password"
                           variant="standard"
                           {...formik.getFieldProps('password')}
                           error={formik.touched.password && !!formik.errors.password}
                           helperText={formik.touched.password && formik.errors.password}
                           onBlur={formik.handleBlur}
                           className={styles.formInput}
                           margin={'normal'}
                />
                <FormControlLabel label={'Remember me'}
                                  className={styles.checkbox}
                                  control={<Checkbox

                                      {...formik.getFieldProps('rememberMe')}
                                  />}/>
                <FormLabel className={styles.forgotPassBlock}>
                    <NavLink to={'/password-recovery'} className={styles.forgotPassLink}>Forgot password?</NavLink>
                </FormLabel>

                <Button type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        className={commonStyle.btnStyle}
                        disabled={!!formik.errors.email || !!formik.errors.password}>
                    Login
                </Button>
                <FormLabel className={styles.footer}>
                    <p className={styles.footerLabel}>Already have an account?</p>
                    <NavLink to={routePath.auth.signUp} className={styles.footerLink}>Sign Up</NavLink>
                </FormLabel>
            </form>
        </Paper>
    );
};

