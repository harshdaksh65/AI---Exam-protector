import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      role: ''
    },
    // ...validation schema here...
    onSubmit: async (values) => {
      // registration logic
      const success = true; // replace with actual success condition
      if (success) {
        navigate('/login'); // or wherever you want to redirect
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

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-subtitle1 font-semibold mb-1 text-gray-700 dark:text-gray-200">Name</label>
          <CustomTextField
            id="name"
            name="name"
            placeholder="Enter Your Name "
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name ? true : false}
            helperText={touched.name && errors.name ? errors.name : null}
            required
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-subtitle1 font-semibold mb-1 text-gray-700 dark:text-gray-200">Email Address</label>
          <CustomTextField
            id="email"
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
        <div>
          <label htmlFor="confirm_password" className="block text-subtitle1 font-semibold mb-1 text-gray-700 dark:text-gray-200">Confirm Password</label>
          <CustomTextField
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="false"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirm_password && errors.confirm_password ? true : false}
            helperText={touched.confirm_password && errors.confirm_password ? errors.confirm_password : null}
            required
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-subtitle1 font-semibold mb-1 text-gray-700 dark:text-gray-200">Role</label>
          <select
            id="role"
            name="role"
            required
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 transition-all duration-300"
          >
            <option value="" disabled>Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {touched.role && errors.role && (
            <p className="mt-1 text-xs text-red-500">{errors.role}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold text-lg shadow-custom hover:bg-primary-dark transition mt-2"
        >
          Sign Up
        </button>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;
