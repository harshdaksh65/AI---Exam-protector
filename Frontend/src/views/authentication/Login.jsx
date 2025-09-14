import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';
import Logo from '../../layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from './../../slices/usersApiSlice';
import { setCredentials } from './../../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from './Loader';

const userValidationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(2, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
const initialUserValues = {
  email: '',
  password: '',
};

const Login = () => {
  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userValidationSchema,
    onSubmit: (values, action) => {
      handleSubmit(values);
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async ({ email, password }) => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      formik.resetForm();
      const redirectLocation = JSON.parse(localStorage.getItem('redirectLocation'));
      if (redirectLocation) {
        localStorage.removeItem('redirectLocation');
        navigate(redirectLocation.pathname);
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-indigo-100 to-blue-100">
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-custom p-8 z-10">
          <div className="flex items-center justify-center mb-6">
            <Logo />
          </div>
          <AuthLogin
            formik={formik}
            subtext={
              <div className="text-subtitle1 text-center text-gray-500 mb-2">CONDUCT SECURE ONLINE EXAMS NOW</div>
            }
            subtitle={
              <div className="flex flex-row justify-center items-center gap-2 mt-4">
                <span className="text-h6 text-gray-500 font-medium">New to Modernize?</span>
                <Link to="/auth/register" className="text-primary font-medium no-underline hover:underline">Create an account</Link>
                {isLoading && <Loader />}
              </div>
            }
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Login;
