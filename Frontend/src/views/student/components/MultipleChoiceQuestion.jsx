import React, { useEffect, useState } from 'react';
import questions from './questionData';

export default function MultipleChoiceQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isFinishTest, setisFinishTest] = useState(false);

  useEffect(() => {
    setIsLastQuestion(currentQuestion === questions.length - 1);
  }, [currentQuestion]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    const isCorrect =
      questions[currentQuestion].options.find((option) => option.isCorrect).id === selectedOption;
    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setisFinishTest(true);
    }
  };

  return (
    <div className="shadow-lg rounded-xl bg-white dark:bg-gray-900 p-6 max-w-xl mx-auto">
      <div className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
        Question {currentQuestion + 1}:
      </div>
      <div className="mb-4 text-base text-gray-700 dark:text-gray-300">
        {questions[currentQuestion].question}
      </div>
      <div className="mb-4">
        <form>
          <div className="flex flex-col gap-3">
            {questions[currentQuestion].options.map((option) => (
              <label key={option.id} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="quiz"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={handleOptionChange}
                  className="form-radio h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-100">{option.text}</span>
              </label>
            ))}
          </div>
        </form>
      </div>
      <div className="flex flex-row justify-between items-center mt-4 gap-2">
        <button
          className={`px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors duration-200 ${selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
        >
          {isLastQuestion ? 'Finish' : 'Next Question'}
        </button>
        {isFinishTest && (
          <div className="text-base text-primary-600 font-medium ml-4">
            Your Score: {score} out of {questions.length}
          </div>
        )}
      </div>
    </div>
  );
}
