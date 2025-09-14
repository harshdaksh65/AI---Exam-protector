import { apiSlice } from './apiSlice';
const RESULTS_URL = '/api/results';

export const resultApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResultsByIds: builder.query({
      query: (resultIds) => ({
        url: `${RESULTS_URL}/batch`,
        method: 'POST',
        body: { resultIds },
      }),
    }),
    // ...existing endpoints...
  }),
});

export const { useGetResultsByIdsQuery } = resultApiSlice;
