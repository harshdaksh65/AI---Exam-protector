import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
import { drawRect } from './utilities';

import { Box, Card } from '@mui/material';
import swal from 'sweetalert';

export default function Home({ cheatingLog, updateCheatingLog }) {
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // Get studentId and examId from cheatingLog
  const studentId = cheatingLog?.studentId || cheatingLog?._id || null;
  const examId = cheatingLog?.examId || null;

  const runCoco = async () => {
    const net = await cocossd.load();
    console.log('Ai models loaded.');

    setInterval(() => {
      detect(net);
    }, 1500);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);

      const ctx = canvasRef.current.getContext('2d');

      let person_count = 0;
      if (obj.length < 1) {
        updateCheatingLog((prevLog) => ({
          ...prevLog,
          noFaceCount: prevLog.noFaceCount + 1,
        }));
        swal('Face Not Visible', 'Action has been Recorded', 'error');
      }
      obj.forEach((element) => {
        if (element.class === 'cell phone') {
          updateCheatingLog((prevLog) => ({
            ...prevLog,
            cellPhoneCount: prevLog.cellPhoneCount + 1,
          }));
          swal('Cell Phone Detected', 'Action has been Recorded', 'error');
        }
        if (element.class === 'book') {
          updateCheatingLog((prevLog) => ({
            ...prevLog,
            prohibitedObjectCount: prevLog.prohibitedObjectCount + 1,
          }));
          swal('Prohibited Object Detected', 'Action has been Recorded', 'error');
        }

        if (!element.class === 'person') {
          swal('Face Not Visible', 'Action has been Recorded', 'error');
        }
        if (element.class === 'person') {
          person_count++;
          if (person_count > 1) {
            updateCheatingLog((prevLog) => ({
              ...prevLog,
              multipleFaceCount: prevLog.multipleFaceCount + 1,
            }));
            swal('Multiple Faces Detected', 'Action has been Recorded', 'error');
            person_count = 0;
          }
        }
      });
    }
  };
  useEffect(() => {
    runCoco();
    // Start video recording when webcam is ready
    let mediaStream = null;
    let recorder = null;
    let chunks = [];
    const startRecording = async () => {
      if (webcamRef.current && webcamRef.current.stream) {
        mediaStream = webcamRef.current.stream;
        recorder = new window.MediaRecorder(mediaStream, { mimeType: 'video/webm' });
        mediaRecorderRef.current = recorder;
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data);
          }
        };
        recorder.onstop = async () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          setVideoBlob(blob);
          // Automatically upload video to backend
          if (blob && studentId && examId) {
            const formData = new FormData();
            formData.append('video', blob, `exam_${examId}_student_${studentId}.webm`);
            formData.append('studentId', studentId);
            formData.append('examId', examId);
            try {
              await axios.post('/api/videos', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              console.log('Video uploaded successfully');
            } catch (err) {
              console.error('Video upload failed:', err);
            }
          }
        };
        recorder.start();
        setRecording(true);
      }
    };
    // Wait for webcam to be ready
    const interval = setInterval(() => {
      if (webcamRef.current && webcamRef.current.stream && !recording) {
        startRecording();
        clearInterval(interval);
      }
    }, 500);
    return () => {
      // Stop recording and upload when component unmounts
      if (mediaRecorderRef.current && recording) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    };
  }, [studentId, examId, recording]);

  return (
    <Box>
      <Card variant="outlined">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,

            width: '100%',
            height: '100%',
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 8,
            width: 240,
            height: 240,
          }}
        />
      </Card>
    </Box>
  );
}
