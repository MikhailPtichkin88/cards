import React from 'react'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import {useAppDispatch, useAppSelector} from '../../common/hooks/useDispatchAndSelector';
import {updatePassword} from '../password-recovery/password-recovery-reducer';

export const NewPassword = () => {
    const statusSendingPassword = useAppSelector(state => state.passwordRecovery.statusSendingPassword)
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
                    console.log(token)
                    dispatch(updatePassword(values.password, token))
                }
                formik.resetForm()
            },
        });

    const disabled = (formik.touched.password && !!formik.errors.password)

    if (statusSendingPassword === 'succeeded') {
        navigate('/login')
    }

    return (
        <Card sx={{maxWidth: 412, margin: '0 auto'}}>
            <form onSubmit={formik.handleSubmit}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Create new password
                    </Typography>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Create new password and we will send you further instructions to email
                    </Typography>
                    <TextField id="password"
                               label="Password"
                               variant="standard"
                               type="password"
                               {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                </CardContent>
                <CardActions>
                    <Button size="small"
                            type="submit"
                            disabled={disabled}
                    >
                        Create new password
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}
