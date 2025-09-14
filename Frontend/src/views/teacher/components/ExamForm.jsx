import React from 'react';

const CreateExam = ({ formik, title, subtitle, subtext }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <>
      {title ? (
        <div className="font-bold text-2xl md:text-3xl mb-2 text-gray-800 dark:text-gray-100">{title}</div>
      ) : null}
      {subtext}
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="examName" className="font-medium text-gray-700 dark:text-gray-300">Exam Name</label>
          <input
            id="examName"
            name="examName"
            type="text"
            value={values.examName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`p-2 rounded-lg border ${touched.examName && errors.examName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
            placeholder="Enter exam name"
          />
          {touched.examName && errors.examName && (
            <span className="text-red-500 text-sm">{errors.examName}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="totalQuestions" className="font-medium text-gray-700 dark:text-gray-300">Total Number of Questions</label>
          <input
            id="totalQuestions"
            name="totalQuestions"
            type="number"
            value={values.totalQuestions}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`p-2 rounded-lg border ${touched.totalQuestions && errors.totalQuestions ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
            placeholder="Enter total questions"
          />
          {touched.totalQuestions && errors.totalQuestions && (
            <span className="text-red-500 text-sm">{errors.totalQuestions}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="duration" className="font-medium text-gray-700 dark:text-gray-300">Exam Duration (minutes)</label>
          <input
            id="duration"
            name="duration"
            type="number"
            value={values.duration}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`p-2 rounded-lg border ${touched.duration && errors.duration ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
            placeholder="Enter duration"
          />
          {touched.duration && errors.duration && (
            <span className="text-red-500 text-sm">{errors.duration}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="liveDate" className="font-medium text-gray-700 dark:text-gray-300">Live Date and Time</label>
          <input
            id="liveDate"
            name="liveDate"
            type="datetime-local"
            value={values.liveDate}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`p-2 rounded-lg border ${touched.liveDate && errors.liveDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
          />
          {touched.liveDate && errors.liveDate && (
            <span className="text-red-500 text-sm">{errors.liveDate}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="deadDate" className="font-medium text-gray-700 dark:text-gray-300">Dead Date and Time</label>
          <input
            id="deadDate"
            name="deadDate"
            type="datetime-local"
            value={values.deadDate}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`p-2 rounded-lg border ${touched.deadDate && errors.deadDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
          />
          {touched.deadDate && errors.deadDate && (
            <span className="text-red-500 text-sm">{errors.deadDate}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors duration-200"
        >
          Create Exam
        </button>
      </form>
      {subtitle}
    </>
  );
};

export default CreateExam;
