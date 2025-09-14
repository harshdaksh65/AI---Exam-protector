import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import Loader from './Loader';
import AuthUpdate from './auth/AuthUpdate';

const userValidationSchema = yup.object({
  name: yup.string().min(2).max(25).required('Please enter your name'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(2, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Password must match'),
  role: yup.string().oneOf(['student', 'teacher'], 'Invalid role').required('Role is required'),
});

const UserAccount = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const initialUserValues = {
    name: userInfo.name || '',
    email: userInfo.email || '',
    password: userInfo.password || '',
    confirm_password: '',
    role: userInfo.role || 'student',
  };

  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userValidationSchema,
    onSubmit: (values, action) => {
      handleSubmit(values);
      // action.resetForm();
    },
  });

  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async ({ name, email, password, confirm_password, role }) => {
    if (password !== confirm_password) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          role,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <PageContainer title="UserAccount" description="this is UserAccount page">
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-indigo-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 opacity-30 pointer-events-none animate-gradient bg-gradient-radial"></div>
        <div className="flex items-center justify-center w-full h-full">
          <div className="shadow-xl rounded-2xl bg-white dark:bg-gray-900 p-8 w-full max-w-lg z-10">
            <AuthUpdate
              formik={formik}
              onSubmit={handleSubmit}
              title={
                <div className="text-center text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 tracking-wide">
                  Update Account Info
                </div>
              }
            />
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default UserAccount;
