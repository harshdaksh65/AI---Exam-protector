import { apiSlice } from './apiSlice';

const RESULTS_URL = '/api/results';

export const resultApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Teacher: Get all results for an exam
    getResultsByExam: builder.query({
      query: (examId) => ({
        url: `${RESULTS_URL}/exam/${examId}`,
        method: 'GET',
      }),
    }),
    // Get all results for a student
    getStudentResults: builder.query({
      query: (studentId) => ({
        url: `${RESULTS_URL}/student/${studentId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'StudentResults' }],
    }),
    // Student: Submit answers to create result
    submitStudentResult: builder.mutation({
      query: ({ studentId, examId, answers }) => ({
        url: `${RESULTS_URL}/student`,
        method: 'POST',
        body: { studentId, examId, answers },
      }),
    }),
    // Teacher: Update result status for a student
    updateResultStatus: builder.mutation({
      query: ({ resultId, status, updatedBy }) => ({
        url: `${RESULTS_URL}/${resultId}`,
        method: 'PUT',
        body: { status, updatedBy },
      }),
      invalidatesTags: [{ type: 'StudentResults' }],
    }),
  }),
});

export const { useGetStudentResultsQuery, useUpdateResultStatusMutation, useSubmitStudentResultMutation, useGetResultsByExamQuery } = resultApiSlice;
