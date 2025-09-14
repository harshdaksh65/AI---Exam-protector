import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const ResultPage = () => {
  return (
    <PageContainer title="Result Page" description="this is Result page">
      <DashboardCard title="Result Page">
        <div className="text-base text-gray-800 dark:text-gray-100">This is a Result page</div>
      </DashboardCard>
    </PageContainer>
  );
};

export default ResultPage;
