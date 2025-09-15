import React from "react";
import { useParams } from "react-router-dom";
import { useGetSnapshotsQuery } from "src/slices/snapshotApiSlice";
import { useGetVideosQuery } from "src/slices/videoApiSlice";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";

const StudentSnapshotsPage = () => {
  const { studentId, examId } = useParams();
  const { data: snapshots, isLoading: loadingSnapshots } = useGetSnapshotsQuery({ studentId, examId });
  const { data: videos, isLoading: loadingVideos } = useGetVideosQuery({ studentId, examId });

  if (loadingSnapshots) return <Typography>Loading snapshots...</Typography>;
  if (loadingVideos) return <Typography>Loading videos...</Typography>;
  if (!snapshots || snapshots.length === 0) return <Typography>No snapshots found.</Typography>;
  // Video section
  const hasVideos = videos && videos.length > 0;

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Webcam Snapshots</Typography>
      <Grid container spacing={2}>
        {snapshots.map((snap) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={snap._id}>
            <Card>
              <CardMedia
                component="img"
                image={snap.url}
                alt={`Snapshot ${snap.createdAt}`}
                height="180"
              />
              <Box p={1}>
                <Typography variant="caption">{new Date(snap.createdAt).toLocaleString()}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Video Section */}
      <Box mt={4}>
        <Typography variant="h5" mb={2}>Webcam Video</Typography>
        {hasVideos ? (
          <Grid container spacing={2}>
            {videos.map((vid) => (
              <Grid item xs={12} md={6} key={vid._id}>
                <Card>
                  <Box p={2}>
                    <video controls width="100%">
                      <source src={vid.url} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                    <Typography variant="caption">{new Date(vid.createdAt).toLocaleString()}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No video found for this student/exam.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default StudentSnapshotsPage;
