import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { Container } from '@mui/material';
import { useGetQuestionsQuery } from 'src/slices/examApiSlice';
import { useParams } from 'react-router';

export default function MultipleChoiceQuestion({ questions, answers, onAnswer, currentQuestion, handleNextQuestion, handleTestSubmission }) {
  // selectedOptionIndex is controlled by parent answers state
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  useEffect(() => {
    // Set selectedOptionIndex from answers when question changes
    if (answers && questions && questions[currentQuestion]) {
      const answerObj = answers.find(a => a.questionId === questions[currentQuestion]._id);
      setSelectedOptionIndex(answerObj ? answerObj.selectedOptionIndex : null);
    }
  }, [currentQuestion, answers, questions]);

  const handleOptionChange = (idx) => {
    setSelectedOptionIndex(idx);
    if (typeof onAnswer === 'function' && questions[currentQuestion]?._id) {
      onAnswer(questions[currentQuestion]._id, idx);
    }
  };

  // handleNextQuestion is now passed from parent

  if (!questions || questions.length === 0) {
    return <Typography variant="body1">No questions available.</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={3}>
          Question {currentQuestion + 1}:
        </Typography>
        <Typography variant="body1" mb={3}>
          {questions[currentQuestion].question}
        </Typography>
        <Box mb={3}>
          <FormControl component="fieldset">
            {questions[currentQuestion].options.map((option, idx) => (
              <FormControlLabel
                key={option._id}
                control={
                  <Checkbox
                    checked={selectedOptionIndex === idx}
                    onChange={() => handleOptionChange(idx)}
                  />
                }
                label={option.optionText}
              />
            ))}
          </FormControl>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          {currentQuestion === questions.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleTestSubmission}
              style={{ marginLeft: 'auto' }}
            >
              Finish
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              disabled={selectedOptionIndex === null}
              style={{ marginLeft: 'auto' }}
            >
              Next Question
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
