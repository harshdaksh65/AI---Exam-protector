import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const imgUrl =
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80';

export default function ExamCard({ exam }) {
  const { subject, duration, total_que, exam_id, active_date, expire_date, type } = exam;
  // handling routes
  const navigate = useNavigate();
  const isExamActive = true; // Date.now() >= active_date && Date.now() <= expire_date;
  const handleCardClick = () => {
    if (isExamActive) {
      navigate(`/exam/${exam_id}`);
    }
    console.log('Exam not Live yet ');
  };

  return (
    <div
      className="shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-900 cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      <img src={imgUrl} alt="exam" className="w-full h-36 object-cover" />
      <div className="p-4 flex flex-col gap-2">
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">{subject}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{type}</div>
        <div className="flex flex-row items-center justify-between mt-1">
          <span className="text-lg font-bold text-gray-800 dark:text-gray-100">{total_que} ques</span>
          <span className="text-gray-400 text-base">{duration}</span>
        </div>
      </div>
    </div>
  );
}
