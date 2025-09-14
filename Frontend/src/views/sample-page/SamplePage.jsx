import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <div className="text-base text-gray-800 dark:text-gray-100">This is a sample page</div>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
