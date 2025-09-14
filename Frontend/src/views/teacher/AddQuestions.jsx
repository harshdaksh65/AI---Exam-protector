import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AddQuestionForm from './components/AddQuestionForm';

const AddQuestions = () => {
  return (
    <PageContainer title="Add Questions Page" description="this is Add Questions page">
      <DashboardCard title="Add Questions Page">
        <div className="text-base text-gray-800 dark:text-gray-100">This is a Add Questions page</div>
        <AddQuestionForm />
      </DashboardCard>
    </PageContainer>
  );
};

export default AddQuestions;
