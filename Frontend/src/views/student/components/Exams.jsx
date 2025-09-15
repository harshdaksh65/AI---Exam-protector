import React from 'react';
import { Grid, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BlankCard from '../../../components/shared/BlankCard';
import ExamCard from './ExamCard';
import { useSelector } from 'react-redux';
import { useGetStudentResultsQuery } from 'src/slices/resultApiSlice';
import { useGetExamsQuery } from 'src/slices/examApiSlice';

const Exams = () => {
  // All hooks at top level
  const { data: userExams, isLoading, isError } = useGetExamsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const studentId = userInfo?._id;
  const { data: studentResults, isLoading: isResultsLoading, isError: isResultsError } = useGetStudentResultsQuery(studentId);

  if (isLoading || isResultsLoading) {
    return <div>Loading...</div>;
  }
  if (isError || isResultsError) {
    return <div>Error fetching exams or results.</div>;
  }

  // Build a set of attempted exam ObjectIds for fast lookup
  const attemptedExamIds = new Set((studentResults || []).map(r => r.exam && r.exam._id));

  return (
    <PageContainer title="Exams" description="List of exams">
      <Grid container spacing={3}>
        {userExams.map((exam) => {
          const attempted = attemptedExamIds.has(exam._id);
          return (
            <Grid item sm={6} md={4} lg={3} key={exam._id}>
              <BlankCard>
                <ExamCard exam={exam} attempted={attempted} />
              </BlankCard>
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
};

export default Exams;
