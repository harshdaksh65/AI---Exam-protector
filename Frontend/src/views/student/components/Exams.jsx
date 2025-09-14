import React from 'react';
import BlankCard from '../../../components/shared/BlankCard';
import ExamCard from './ExamCard';

const userExam = [
  {
    exam_id: 1,
    subject: 'Theory Of Computation',
    duration: '30min',
    active_date: '10 Sept 2023',
    total_que: 30,
    expire_date: '11 sept 2023',
    Exam_link_code: 133,
    type: 'MCQ',
  },
  {
    exam_id: 2,
    subject: 'Theory Of Computation',
    duration: '30min',
    active_date: '10 Sept 2023',
    total_que: 30,
    expire_date: '11 sept 2023',
    Exam_link_code: 3233,
    type: 'MCQ',
  },
  {
    exam_id: 3,
    subject: 'Theory Of Computation',
    duration: '30min',
    active_date: '10 Sept 2023',
    total_que: 30,
    expire_date: '11 sept 2023',
    Exam_link_code: 123,
    type: 'MCQ',
  },
  {
    exam_id: 4,
    subject: 'Theory Of Computation',
    duration: '30min',
    active_date: '10 Sept 2023',
    total_que: 30,
    expire_date: '11 sept 2023',
    Exam_link_code: 233,
    type: 'MCQ',
  },
];

const Exams = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {userExam.map((exam, index) => (
        <BlankCard key={index}>
          <ExamCard exam={exam} />
        </BlankCard>
      ))}
    </div>
  );
};

export default Exams;
