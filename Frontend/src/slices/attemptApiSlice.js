import { apiSlice } from './apiSlice';

const ATTEMPT_URL = '/api/attempts';

export const attemptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkExamAttempt: builder.query({
      query: ({ examId, studentId }) => ({
        url: `${ATTEMPT_URL}/check/${examId}/${studentId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCheckExamAttemptQuery } = attemptApiSlice;
