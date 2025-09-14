import { apiSlice } from './apiSlice';

const RESULTS_URL = '/api/results';

export const resultApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResultById: builder.query({
      query: (resultId) => ({
        url: `${RESULTS_URL}/${resultId}`,
        method: 'GET',
      }),
    }),
    // ...existing endpoints...
  }),
});

export const { useGetResultByIdQuery } = resultApiSlice;
