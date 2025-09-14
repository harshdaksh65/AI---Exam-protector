import React from 'react';
import questions from './questionData';
import BlankCard from 'src/components/shared/BlankCard';

const NumberOfQuestions = () => {
  const totalQuestions = 35; //questions.length;
  const questionNumbers = Array.from({ length: totalQuestions }, (_, index) => index + 1);
  const handleQuestionButtonClick = (questionNumber) => {
    console.log(questionNumber);
  };

  // Create an array of rows, each containing up to 5 question numbers
  const rows = [];
  for (let i = 0; i < questionNumbers.length; i += 5) {
    rows.push(questionNumbers.slice(i, i + 5));
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-2 w-full px-6 mb-10 shadow">
        <div className="flex flex-row items-center justify-between">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">Questions: 1/10</span>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">Timer</span>
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-colors duration-200">
            Finish Test
          </button>
        </div>
      </div>
      <div className="max-h-[270px] overflow-y-auto px-2">
        <div className="flex flex-col gap-2">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row gap-2 mb-1">
              {row.map((questionNumber) => (
                <button
                  key={questionNumber}
                  className="w-10 h-10 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-lg font-bold flex items-center justify-center cursor-pointer hover:bg-primary-600 hover:text-white transition-colors duration-200"
                  onClick={() => handleQuestionButtonClick(questionNumber)}
                >
                  {questionNumber}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NumberOfQuestions;
