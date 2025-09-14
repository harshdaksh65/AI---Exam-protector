import React, { useState } from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import CheatingTable from './components/CheatingTable';
import TeacherExamResults from './components/TeacherExamResults';

const ExamLogPage = () => {
  const [selectedExamId, setSelectedExamId] = useState('');
  return (
    <PageContainer title="ExamLog Page" description="this is ExamLog page">
      <DashboardCard title="ExamLog Page">
        <Typography>This is a ExamLog page</Typography>
        <CheatingTable selectedExamId={selectedExamId} setSelectedExamId={setSelectedExamId} />
      </DashboardCard>
    </PageContainer>
  );
};

export default ExamLogPage;
