import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { toast } from 'react-toastify';

function Copyright() {
  return (
    <div className="text-sm text-gray-500 text-center mt-4">
      Copyright © <a className="text-primary-600 hover:underline" href="https://mui.com/">Your Website</a> {new Date().getFullYear()}.
    </div>
  );
}

const DescriptionAndInstructions = () => {
  const navigate = useNavigate();
  const { exam_id } = useParams();
  const test_id = uniqueId();
  const [certify, setCertify] = useState(false);
  const handleCertifyChange = () => setCertify(!certify);
  const handleTest = () => {
    const isValid = true;
    if (isValid) {
      navigate(`/exam/${exam_id}/${test_id}`);
    } else {
      toast.error('Test date is not valid.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-8 w-full max-w-2xl mx-auto">
      <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Description</div>
      <div className="mb-2 text-base text-gray-700 dark:text-gray-300">
        This practice test will allow you to measure your Python skills at the beginner level by the way of various multiple choice questions. We recommend you to score at least 75% in this test before moving to the next level questionnaire. It will help you in identifying your strength and development areas. Based on the same you can plan your next steps in learning Python and preparing for job placements.
      </div>
      <div className="mb-4 text-sm text-primary-600">#Python #Coding #Software #MCQ #Beginner #Programming Language</div>
      <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-4">Test Instructions</div>
      <ol className="list-decimal list-inside space-y-2 mb-6">
        <li>This Practice Test consists of only <strong>MCQ questions.</strong></li>
        <li>There are a total of <strong>40 questions.</strong> Test Duration is <strong>30 minutes.</strong></li>
        <li>There is <strong>Negative Marking</strong> for wrong answers.</li>
        <li><strong>Do Not switch tabs</strong> while taking the test. <strong>Switching Tabs will Block / End the test automatically.</strong></li>
        <li>The test will only run in <strong>full screen mode.</strong> Do not switch back to tab mode. Test will end automatically.</li>
        <li>You may need to use blank sheets for rough work. Please arrange for blank sheets before starting.</li>
        <li>Clicking on Back or Next will save the answer.</li>
        <li>Questions can be reattempted till the time test is running.</li>
        <li>Click on the finish test once you are done with the test.</li>
        <li>You will be able to view the scores once your test is complete.</li>
      </ol>
      <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-2">Confirmation</div>
      <div className="mb-4 text-base text-gray-700 dark:text-gray-300">
        Your actions shall be proctored and any signs of wrongdoing may lead to suspension or cancellation of your test.
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={certify}
            onChange={handleCertifyChange}
            className="form-checkbox h-5 w-5 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-gray-800 dark:text-gray-100 text-base">
            I certify that I have carefully read and agree to all of the instructions mentioned above
          </span>
        </label>
        <button
          className={`px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors duration-200 ${!certify ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!certify}
          onClick={handleTest}
        >
          Start Test
        </button>
      </div>
      <Copyright />
    </div>
  );
};

const imgUrl =
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

export default function ExamDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
      <div
        className="hidden md:block md:col-span-7 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <div className="col-span-1 md:col-span-5 h-full flex items-center justify-center bg-white dark:bg-gray-900">
        <DescriptionAndInstructions />
      </div>
    </div>
  );
}
