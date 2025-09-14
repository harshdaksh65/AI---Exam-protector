import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ExamForm from './components/ExamForm';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { useUpdateUserMutation } from '../../slices/usersApiSlice';
// import { setCredentials } from '../../slices/authSlice';

const examValidationSchema = yup.object({
  examName: yup.string().required('Exam Name is required'),
  totalQuestions: yup
    .number()
    .typeError('Total Number of Questions must be a number')
    .integer('Total Number of Questions must be an integer')
    .positive('Total Number of Questions must be positive')
    .required('Total Number of Questions is required'),
  duration: yup
    .number()
    .typeError('Exam Duration must be a number')
    .integer('Exam Duration must be an integer')
    .min(1, 'Exam Duration must be at least 1 minute')
    .required('Exam Duration is required'),
  liveDate: yup.date().required('Live Date and Time is required'),
  deadDate: yup.date().required('Dead Date and Time is required'),
});

const CreateExamPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const initialExamValues = {
    examName: '',
    totalQuestions: '',
    duration: '',
    liveDate: '',
    deadDate: '',
  };

  const formik = useFormik({
    initialValues: initialExamValues,
    validationSchema: examValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    console.log('Exam data: ', values);
    try {
      toast.success('Exam Created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <PageContainer title="CreateExamPage" description="This is CreateExamPage page">
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-indigo-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 opacity-30 pointer-events-none animate-gradient bg-gradient-radial"></div>
        <div className="flex items-center justify-center w-full h-full">
          <div className="shadow-xl rounded-2xl bg-white dark:bg-gray-900 p-8 w-full max-w-lg z-10">
            <ExamForm
              formik={formik}
              onSubmit={handleSubmit}
              title={
                <div className="text-center text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 tracking-wide">
                  Create Exam
                </div>
              }
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CreateExamPage;
