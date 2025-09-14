import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    // ...validation schema
    onSubmit: async (values) => {
      // login logic
      const success = true; // replace with actual success condition
      if (success) {
        navigate('/dashboard'); // or your desired route
      }
    }
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;
  return (
    <>
      {title ? (
        <h2 className="text-h2 font-sans font-bold mb-2 text-gray-900 dark:text-gray-100">{title}</h2>
      ) : null}

      {subtext}

      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="username" className="block text-subtitle1 font-semibold mb-1 text-gray-700 dark:text-gray-200">Username</label>
          <CustomTextField
            id="username"
            name="email"
            placeholder="Enter Your Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? true : false}
            helperText={touched.email && errors.email ? errors.email : null}
            required
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-subtitle1 font-semibold mb-1 text-gray-700 dark:text-gray-200">Password</label>
          <CustomTextField
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password ? true : false}
            helperText={touched.password && errors.password ? errors.password : null}
            required
            className="mt-1"
          />
        </div>
        <div className="flex flex-row justify-between items-center my-2">
          <label className="inline-flex items-center">
            <input type="checkbox" defaultChecked className="form-checkbox accent-primary" />
            <span className="ml-2 text-gray-700 dark:text-gray-200">Remember this Device</span>
          </label>
          <a href="#" className="text-primary font-medium no-underline hover:underline">Forgot Password?</a>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold text-lg shadow-custom hover:bg-primary-dark transition"
        >
          Sign In
        </button>
      </div>
      {subtitle}
    </>
  );
};

export default AuthLogin;
