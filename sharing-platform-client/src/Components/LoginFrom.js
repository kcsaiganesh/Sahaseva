import * as React from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { login } from '../redux/userSlice';
import { Container, Typography, Box, Link, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CssBaseline, FormControlLabel, Checkbox, Avatar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginError, setLoginError] = React.useState('');
    const [loginSuccess, setLoginSuccess] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:4000/api/auth/login', values);
                const { token, user } = response.data;
                // Save the JWT token in local storage or cookies
                localStorage.setItem('token', token);
                // After successful login
                localStorage.setItem('isLoggedIn', 'true');


                dispatch(login(user));
                setLoginError('');
                setLoginSuccess(true);
                setOpenDialog(true);
                setTimeout(() => {
                    setOpenDialog(false);
                    navigate('/');
                }, 2000);
            } catch (error) {
                setLoginError('Invalid email or password');
                setLoginSuccess(false);
            }
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ height: 570 }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    {loginError && (
                        <Typography component="p" variant="body2" color="error" align="center">
                            {loginError}
                        </Typography>
                    )}
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>Login Successful</DialogTitle>
                        <DialogContent>
                            <Alert severity="success" sx={{ mt: 2 }}>
                                You have successfully logged in.
                            </Alert>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
