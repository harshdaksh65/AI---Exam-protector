import { apiSlice } from "./apiSlice";

export const videoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: ({ studentId, examId }) => `/api/videos/${studentId}/${examId}`,
    }),
  }),
});

export const { useGetVideosQuery } = videoApiSlice;
