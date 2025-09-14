import React, { useState } from 'react';
import swal from 'sweetalert';

const AddQuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [correctOptions, setCorrectOptions] = useState([false, false, false, false]);

  const handleOptionChange = (index) => {
    const updatedCorrectOptions = [...correctOptions];
    updatedCorrectOptions[index] = !correctOptions[index];
    setCorrectOptions(updatedCorrectOptions);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() === '' || newOptions.some((option) => option.trim() === '')) {
      swal('', 'Please fill out the question and all options.', 'error');
      return;
    }
    const newQuestionObj = {
      question: newQuestion,
      options: newOptions.map((option, index) => ({
        optionText: option,
        isCorrect: correctOptions[index],
      })),
    };
    setQuestions([...questions, newQuestionObj]);
    setNewQuestion('');
    setNewOptions(['', '', '', '']);
    setCorrectOptions([false, false, false, false]);
  };

  const handleSubmitQuestions = () => {
    console.log('Submitted Questions:', questions);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      {questions.map((questionObj, questionIndex) => (
        <div key={questionIndex} className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {`Question ${questionIndex + 1}`}
          </label>
          <input
            type="text"
            value={questionObj.question}
            readOnly
            className="w-full p-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          />
          {questionObj.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={option.optionText}
                readOnly
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={option.isCorrect} disabled className="form-checkbox h-5 w-5 text-primary-600" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Correct Option {optionIndex + 1}</span>
              </label>
            </div>
          ))}
        </div>
      ))}
      <label className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">New Question</label>
      <textarea
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        rows={3}
        className="w-full p-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        placeholder="Enter your question here"
      />
      {newOptions.map((option, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={newOptions[index]}
            onChange={(e) => {
              const updatedOptions = [...newOptions];
              updatedOptions[index] = e.target.value;
              setNewOptions(updatedOptions);
            }}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            placeholder={`Option ${index + 1}`}
          />
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={correctOptions[index]}
              onChange={() => handleOptionChange(index)}
              className="form-checkbox h-5 w-5 text-primary-600"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Correct Option {index + 1}</span>
          </label>
        </div>
      ))}
      <div className="flex flex-row gap-4 mt-4">
        <button
          type="button"
          className="px-4 py-2 rounded-lg border border-primary-600 text-primary-600 font-semibold bg-white dark:bg-gray-900 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors duration-200"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-lg border border-primary-600 text-primary-600 font-semibold bg-white dark:bg-gray-900 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors duration-200"
          onClick={handleSubmitQuestions}
        >
          Submit Questions
        </button>
      </div>
    </div>
  );
};

export default AddQuestionForm;
