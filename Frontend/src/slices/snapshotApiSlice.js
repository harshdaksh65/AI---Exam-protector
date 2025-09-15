import { apiSlice } from "./apiSlice";

export const snapshotApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadSnapshot: builder.mutation({
      query: ({ image, studentId, examId }) => ({
        url: "/api/snapshots",
        method: "POST",
        body: { image, studentId, examId },
      }),
    }),
    getSnapshots: builder.query({
      query: ({ studentId, examId }) => `/api/snapshots/${studentId}/${examId}`,
    }),
  }),
});

export const { useUploadSnapshotMutation, useGetSnapshotsQuery } = snapshotApiSlice;
