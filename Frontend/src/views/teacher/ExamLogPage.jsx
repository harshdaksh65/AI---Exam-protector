import React, { useState, useEffect } from 'react';
import { useGetExamsQuery } from 'src/slices/examApiSlice';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import CheatingTable from './components/CheatingTable';
import TeacherExamResults from './components/TeacherExamResults';

const ExamLogPage = () => {
  const [selectedExamId, setSelectedExamId] = useState('');
  const { data: examsData, isLoading } = useGetExamsQuery();

  useEffect(() => {
    if (examsData && examsData.length > 0 && !selectedExamId) {
      setSelectedExamId(examsData[0].examId);
    }
  }, [examsData, selectedExamId]);
  if (isLoading || !selectedExamId) {
    return <Typography>Loading exams...</Typography>;
  }
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
