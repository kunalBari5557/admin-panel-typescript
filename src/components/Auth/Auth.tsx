import React, { useEffect, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { login } from '../../redux/features/Auth/Auth';
import { AdminLoginSchema } from './../../ValidationSchema/index';
import { useFormik } from 'formik';

interface SignUpProps {}

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp: React.FC<SignUpProps> = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch<any>();
  let is_alert = false;
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const loginForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: AdminLoginSchema,
    onSubmit: async (values) => {
      try {
        const actionResult = await dispatch(login(values));

        const { token } = actionResult.payload;
        if (token) {
          localStorage.setItem('Token', token);
          Navigate('/User');
          toast.dismiss();
          toast.success('Welcome to the dashboard');
        }
      } catch (error) {
        toast.dismiss();
        toast.error('Invalid email or password. Please try again.');
      }
    },
  });

  useEffect(() => {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href =
      window.location.origin + '/assets/css/authentication/form-2.css';

    document.head.appendChild(linkElement);

    return () => {
      document.head.removeChild(linkElement);
    };
  }, [location]);

  useEffect(() => {
    if (location.state !== null) {
      if (is_alert === false) {
        toast.success(location.state);
      }

      is_alert = true;
    }
    window.history.replaceState({}, location.state);
  }, []);

  return (
    <Container component="main" maxWidth="xs" sx={{ paddingX: 3 }}>
      <Paper
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 5,
          borderRadius: 2,
        }}
        elevation={3}
      >
        <Avatar sx={{ backgroundColor: '#f50057' }}>
          <LockIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: 'center', marginTop: '1rem' }}
        >
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form onSubmit={loginForm.handleSubmit}>
          <Grid sx={{ marginTop: '1rem' }} container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="username"
              label="Username"
              value={loginForm.values.username}
              handleChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.username && loginForm.touched.username ? (
              <h6 className="text-danger mt-2 ml-1">
                {loginForm.errors.username}
              </h6>
            ) : null}
            <Input
              name="password"
              label="Password"
              value={loginForm.values.password}
              handleChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {loginForm.errors.password && loginForm.touched.password ? (
              <h6 className="text-danger mt-2 ml-1">
                {loginForm.errors.password}
              </h6>
            ) : null}
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
