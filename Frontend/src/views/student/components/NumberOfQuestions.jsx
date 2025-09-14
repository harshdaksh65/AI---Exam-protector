import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import questions from './questionData';
import BlankCard from 'src/components/shared/BlankCard';
import { Box, Button, Stack, Typography } from '@mui/material';
import Countdown from 'react-countdown';
const NumberOfQuestions = ({ questionLength, submitTest, examDurationInSeconds, currentQuestion, onJumpToQuestion, answers, questions, answeredAndMoved, submitted }) => {
  const totalQuestions = questionLength; //questions.length;
  // Generate an array of question numbers from 1 to totalQuestions
  const questionNumbers = Array.from({ length: totalQuestions }, (_, index) => index + 1);
  const handleQuestionButtonClick = (questionNumber) => {
    if (typeof onJumpToQuestion === 'function') {
      onJumpToQuestion(questionNumber - 1);
    }
  };

  // Create an array of rows, each containing up to 4 question numbers
  const rows = [];
  for (let i = 0; i < questionNumbers.length; i += 5) {
    rows.push(questionNumbers.slice(i, i + 5));
  }

  // Timer related states
  const [timer, setTimer] = useState(examDurationInSeconds); // Initialize timer with examDurationInSeconds
  // Countdown timer
  useEffect(() => {
    setTimer(examDurationInSeconds);
  }, [examDurationInSeconds]);

  useEffect(() => {
    if (submitted) return; // Stop timer if submitted
    if (timer <= 0) {
      submitTest();
      return;
    }
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [timer, submitTest, submitted]);

  return (
    <>
      <Box
        position="sticky"
        top="0"
        zIndex={1}
        bgcolor="white" // Set background color as needed
        paddingY="10px" // Add padding to top and bottom as needed
        width="100%"
        px={3}
        // mb={5}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">
            Questions: {currentQuestion + 1}/{questionLength}
          </Typography>
          <Typography variant="h6">
            Time Left: {Math.floor(timer / 60)}:{timer % 60}
          </Typography>
          <Button variant="contained" onClick={() => submitTest()} color="error" disabled={submitted}>
            {submitted ? 'Test Submitted' : 'Finish Test'}
          </Button>
        </Stack>
      </Box>

      <Box p={3} mt={5} maxHeight="270px">
        <Grid container spacing={1}>
          {rows.map((row, rowIndex) => (
            <Grid key={rowIndex} item xs={12}>
              <Stack direction="row" alignItems="center" justifyContent="start">
                {row.map((questionNumber) => {
                  const questionObj = questions && questions[questionNumber - 1];
                  const isAnsweredAndMoved = answeredAndMoved && questionObj && answeredAndMoved.includes(questionObj._id);
                  return (
                    <Avatar
                      key={questionNumber}
                      variant="rounded"
                      style={{
                        width: '40px',
                        height: '40px',
                        fontSize: '20px',
                        cursor: 'pointer',
                        margin: '3px',
                        background: isAnsweredAndMoved ? '#90ee90' : '#ccc',
                        color: '#fff',
                      }}
                      onClick={() => handleQuestionButtonClick(questionNumber)}
                    >
                      {questionNumber}
                    </Avatar>
                  );
                })}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default NumberOfQuestions;
