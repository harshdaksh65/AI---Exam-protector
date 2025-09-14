import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
import { drawRect } from './utilities';
import swal from 'sweetalert';

export default function Home() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log('Ai models loaded.');
    setInterval(() => {
      detect(net);
    }, 10);
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
      console.log('OBJ', obj);
      if (obj.length < 1) {
        swal('Face Not Visible', 'Action has been Recorded', 'error');
      }
      let person_count = 0;
      obj.forEach((element) => {
        if (element.class === 'cell phone') {
          swal('Cell Phone Detected', 'Action has been Recorded', 'error');
        }
        if (element.class === 'book') {
          swal('Prohibited Object Detected', 'Action has been Recorded', 'error');
        }
        if (!element.class === 'person') {
          swal('Face Not Visible', 'Action has been Recorded', 'error');
        }
        if (element.class === 'person') {
          person_count++;
          if (person_count > 1) {
            swal('Multiple Faces Detected', 'Action has been Recorded', 'error');
            person_count = 0;
          }
        }
      });
      // drawRect(obj, ctx);
    }
  };
  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-[300px] h-[300px]">
        <Webcam
          ref={webcamRef}
          muted={true}
          className="rounded-xl shadow-lg w-[300px] h-[300px] object-cover z-10"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-[300px] h-[300px] rounded-xl z-0 pointer-events-none"
        />
      </div>
    </div>
  );
}
