import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Exams from './components/Exams';

const ExamPage = () => {
  return (
    <PageContainer title="Exam Page" description="this is Exam page">
      <DashboardCard title="Exam Page">
        <div className="text-base text-gray-800 dark:text-gray-100">This is a Exam page</div>
        <Exams />
      </DashboardCard>
    </PageContainer>
  );
};

export default ExamPage;
