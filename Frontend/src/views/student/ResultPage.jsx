

import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useGetStudentResultsQuery } from 'src/slices/resultApiSlice';

const ResultPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const studentId = userInfo?._id;
  const { data: results, isLoading } = useGetStudentResultsQuery(studentId);

  return (
    <PageContainer title="Result Page" description="Your exam results">
      <DashboardCard title="Exam Results">
        <TableContainer component={Paper} sx={{ maxWidth: 700, margin: '0 auto', mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sno</TableCell>
                <TableCell>Exam Name</TableCell>
                <TableCell>Score (%)</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">Loading...</TableCell>
                </TableRow>
              ) : results && results.length > 0 ? (
                results.map((result, idx) => (
                  <TableRow key={result._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{result.exam?.examName || 'Exam'}</TableCell>
                    <TableCell>{result.score}%</TableCell>
                    <TableCell>{result.status.charAt(0).toUpperCase() + result.status.slice(1)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">No results found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={4} textAlign="center">
          <Typography variant="subtitle1">Thank you for participating in the exams!</Typography>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ResultPage;
