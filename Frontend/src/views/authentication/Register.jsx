import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';
import AuthRegister from './auth/AuthRegister';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from './../../slices/usersApiSlice';
import { setCredentials } from './../../slices/authSlice';
import Loader from './Loader';
import LogoDark from '/src/assets/images/logos/dark-logo.svg';

const userValidationSchema = yup.object({
  name: yup.string().min(2).max(25).required('Please enter your name'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Password must match'),
  role: yup.string().oneOf(['student', 'teacher'], 'Invalid role').required('Role is required'),
});
const initialUserValues = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  role: 'student',
};

const Register = () => {
  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userValidationSchema,
    onSubmit: (values, action) => {
      handleSubmit(values);
      // action.resetForm();
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async ({ name, email, password, confirm_password, role }) => {
    if (password !== confirm_password) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password, role }).unwrap();
        dispatch(setCredentials({ ...res }));
        formik.resetForm();
        navigate('/auth/login');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <PageContainer title="Register" description="this is Register page">
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-indigo-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 opacity-30 pointer-events-none animate-gradient bg-gradient-radial"></div>
        <div className="flex items-center justify-center w-full h-full">
          <div className="shadow-xl rounded-2xl bg-white dark:bg-gray-900 p-6 w-full max-w-lg z-10">
            <div className="flex items-center justify-center mb-4">
              <img src={LogoDark} alt="Logo" className="h-full w-full object-contain" />
            </div>
            <AuthRegister
              formik={formik}
              onSubmit={handleSubmit}
              subtext={
                <div className="text-center text-base font-medium text-gray-500 dark:text-gray-300 mb-2 tracking-wide">
                  CONDUCT SECURE ONLINE EXAMS NOW
                </div>
              }
              subtitle={
                <div className="flex flex-row justify-center items-center gap-2 mt-4">
                  <span className="text-gray-500 dark:text-gray-400 text-base font-normal">Already have an Account?</span>
                  <Link
                    to="/auth/login"
                    className="font-semibold text-primary-600 dark:text-primary-400 hover:underline transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  {isLoading && <Loader />}
                </div>
              }
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Register;
