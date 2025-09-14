import React from 'react';
import { useGetResultsByExamQuery } from '../../../slices/resultApiSlice';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export default function TeacherExamResults({ examId }) {
  const { data: results, isLoading } = useGetResultsByExamQuery(examId);

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2}>All Student Results</Typography>
      <Typography variant="body2" color="textSecondary" mb={2}>
        <strong>Exam ID:</strong> {examId || '(none selected)'}
      </Typography>
      {!examId && (
        <Typography color="error" mb={2}>No exam selected. Please select an exam above.</Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sno</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Score (%)</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">Loading...</TableCell>
              </TableRow>
            ) : results && results.length > 0 ? (
              results.map((result, idx) => (
                <TableRow key={result._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{result.student?.name || '-'} </TableCell>
                  <TableCell>{result.student?.email || '-'}</TableCell>
                  <TableCell>{result.score}%</TableCell>
                  <TableCell>{result.status.charAt(0).toUpperCase() + result.status.slice(1)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No results found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
